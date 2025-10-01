
// store/instances.ts
import { useUiStore, useEventStore, useModelStore, useAuthStore } from './index'

export const uiStore = useUiStore()
export const eventStore = useEventStore()
export const modelStore = useModelStore()
export const authStore = useAuthStore()
