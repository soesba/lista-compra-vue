import './assets/styles/main.scss'

import { createApp, defineComponent } from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import { pinia, useModelStore } from './store'
import { useUiStore, useEventCardStore } from './store'
import { xhr } from '@/api/config/Repository'
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { loadFonts } from './plugins/webfontloader'

import InterceptorMessages from './services/interceptors/InterceptorMessages'

loadFonts()
export const CustomDialog = defineComponent({
  name: 'DialogComponent'
})
const vuetify = createVuetify({
  components,
  directives
})
createApp(App).
  use(pinia).
  use(router).
  use(vuetify).  
  use(Vuelidate).
  mount('#app')

export const interceptorMsg = new InterceptorMessages(xhr)
interceptorMsg.execute()
export const uiStore = useUiStore()
export const eventCardStore = useEventCardStore()
export const modelStore = useModelStore()
export const noLogoUrl = new URL('@/assets/images/no-image.svg', import.meta.url).href