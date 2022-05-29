import path from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { highlight } from '../utils/highlight'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'

const localMd = MarkdownIt()

const docRoot = ''

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string
}

export const mdPlugin = async (md: MarkdownIt) => {
  const highlightFn = await highlight()
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      const m = tokens[idx].info
        .trim()
        .match(/^demo\s*(.*)$/)
      if (
        tokens[idx].nesting ===
        1 /* means the tag is opening */
      ) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        let sourceFile =
          sourceFileToken.children?.[0].content ?? ''

        if (!sourceFile.endsWith('.vue')) {
          sourceFile += '/index.vue'
        }

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            sourceFile.endsWith('.vue')
              ? sourceFile
              : path.resolve(docRoot, `${sourceFile}.vue`),
            'utf-8'
          )
        }
        if (!source)
          throw new Error(
            `Incorrect source file: ${sourceFile}`
          )

        return `<DemoWrapper :demos="demos" source="${encodeURIComponent(
          highlightFn(source, 'vue')
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(
          localMd.render(description)
        )}">`
      } else {
        return '</DemoWrapper>'
      }
    },
  } as ContainerOpts)
}
