import path from 'path'
import Unocss from 'unocss/vite'
import { MarkdownTransform } from './.vitepress/plugins/md-transform'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  resolve: {
    alias: {
      'my-lib/': `${path.resolve(
        __dirname,
        '../dist/es'
      )}/`,
    },
  },
  plugins: [vueJsx(), MarkdownTransform(), Unocss()],
}
