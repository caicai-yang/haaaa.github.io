import type { App } from 'vue'
import Request from './index.vue'

Request.install = (app: App) => {
  app.component(Request.name, Request)
}

export { Request }
export default Request
