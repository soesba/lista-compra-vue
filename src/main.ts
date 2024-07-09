import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const vuetify = createVuetify({
  components,
  directives
})
createApp(App).
  use(store).
  use(router).
  use(vuetify).
  mount('#app')
