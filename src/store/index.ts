import { createPinia } from 'pinia'

export const pinia = createPinia()
export { useUiStore } from './ui'
export { useEventCardStore } from './cards'