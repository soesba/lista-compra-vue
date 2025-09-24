import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia, useModelStore } from './store'
import { useUiStore, useEventStore, useAuthStore } from './store'
import { xhr } from '@/api/config/Repository'
// Vuetify
import { es } from 'vuetify/locale'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { loadFonts } from './plugins/webfontloader'
import InterceptorMessages from './services/interceptors/InterceptorMessages'

loadFonts()
const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'es',
    messages: { es }
  }
})

let app
let containerSelector = "#app"

// check if app has been mounted already
const mountPoint = document.querySelector(containerSelector)

if (mountPoint && (mountPoint as any).__vue_app__ !== undefined) {
  // Set the existing mount point to 'app'.
  app = (mountPoint as any).__vue_app__._instance.proxy;
}
else {
  app = createApp(App)
  app.use(pinia).
    use(router).
    use(vuetify).
    mount('#app')
}

export const interceptorMsg = new InterceptorMessages(xhr)
interceptorMsg.execute()
export const uiStore = useUiStore()
export const eventStore = useEventStore()
export const modelStore = useModelStore()
export const authStore = useAuthStore()
export const noLogoUrl = new URL('@/assets/images/no-image.svg', import.meta.url).href
