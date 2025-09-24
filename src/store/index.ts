import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const pinia = createPinia()
pinia.use(createPersistedState({
    storage: localStorage, // O sessionStorage si prefieres
}));
export { useUiStore } from './ui'
export { useEventStore } from './events'
export { useModelStore } from './models'
export { useAuthStore } from './auth'
