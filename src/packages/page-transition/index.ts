import type { App } from 'vue'
import PageTransition from './index.vue'

PageTransition.install = (app: App) => {
  app.component(PageTransition.name, PageTransition)
}

export { PageTransition }
export default PageTransition
