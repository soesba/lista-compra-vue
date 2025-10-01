import { createPinia } from 'pinia'
import { useAuthStore } from './auth'
import { useUiStore } from './ui'
import { useEventStore } from './events'
import { useModelStore } from './models'

import { createPersistedState } from 'pinia-plugin-persistedstate'

export const pinia = createPinia()
pinia.use(createPersistedState({
    storage: localStorage, // O sessionStorage si prefieres
}))

export const initStores = () => {
  const authStore = useAuthStore()
  const uiStore = useUiStore()
  const eventStore = useEventStore()
  const modelStore = useModelStore()

  return {
    authStore,
    uiStore,
    eventStore,
    modelStore
  }
}