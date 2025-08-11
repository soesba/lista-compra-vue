import { createPinia } from 'pinia'

export const pinia = createPinia()
export { useUiStore } from './ui'
export { useEventStore } from './events'
export { useModelStore } from './models'
