import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia, initStores } from '@/store'
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
import CardList from '@/components/cards-system/CardList.vue';
import TitleView from '@/components/TitleView.vue';
import SearchBox from '@/components/SearchBox.vue';


loadFonts()
const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'es',
    messages: { es }
  }
})

// let app
// let containerSelector = "#app";

// // check if app has been mounted already
// const mountPoint = document.querySelector(containerSelector);

// if (mountPoint && (mountPoint as any).__vue_app__ !== undefined) {
//     // Set the existing mount point to 'app'.
//     app = (mountPoint as any).__vue_app__._instance.proxy;
//     app.use(pinia)
// } else {
//   app = createApp(App).use(pinia);
// }

const app = createApp(App)

app.use(pinia);

// Inicializa los stores antes de usar el router
export const { authStore, uiStore, eventStore, modelStore } = initStores()

export const interceptorMsg = new InterceptorMessages(xhr)
interceptorMsg.execute()

export const noLogoUrl = new URL('@/assets/images/no-logo.svg', import.meta.url).href
export const noAvatarUrl = new URL('@/assets/images/no-avatar.png', import.meta.url).href

app.use(router).
  use(vuetify).
  component('CardList', CardList).
  component('TitleView', TitleView).
  component('SearchBox', SearchBox).
  mount('#app')

export const listaAvatares = (() => {
  const lista = []
  lista.push(new URL('@/assets/images/no-avatar.png', import.meta.url).href)
  const nombres = ['cat-avatar', 'dog-avatar']
  for (let i = 1; i <= nombres.length; i++) {
    lista.push(new URL('assets/images/' + nombres[i - 1] + '.svg', import.meta.url).href)
  }
  return lista
})
