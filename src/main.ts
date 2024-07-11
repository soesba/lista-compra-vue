import './assets/styles/main.scss'

import { createApp, defineComponent } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import { useUiStore } from './store'
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { loadFonts } from './plugins/webfontloader'

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
  mount('#app')

export const uiStore = useUiStore()