import { createApp } from 'vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import ArcoIcon from '@arco-design/web-vue/es/icon'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
  .use(ArcoVue)
  .use(ArcoIcon)
  .use(router)
  .mount('#app')
