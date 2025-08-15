import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia, useModelStore } from './store'
import { useUiStore, useEventStore } from './store'
import { xhr } from '@/api/config/Repository'
// FontAwesome
import { FontAwesomeIcon, dom, library } from "./plugins/fontawesome";
// MDI
import '@mdi/font/css/materialdesignicons.css'
// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import DialogService from 'primevue/dialogservice';
// PrimeIcons
import 'primeicons/primeicons.css'

import { loadFonts } from './plugins/webfontloader'
import InterceptorMessages from './services/interceptors/InterceptorMessages'

loadFonts()
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
  app.component('CrfIcon', FontAwesomeIcon)
  app.use(pinia).
    use(PrimeVue, { theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: false || 'none'
      }
    }}).
    use(DialogService).
    use(router).
    mount('#app')
}

export const interceptorMsg = new InterceptorMessages(xhr)
interceptorMsg.execute()
export const uiStore = useUiStore()
export const eventStore = useEventStore()
export const modelStore = useModelStore()
export const noLogoUrl = new URL('@/assets/images/no-image.svg', import.meta.url).href
