import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export type Guard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => Promise<void>
export type Next = NavigationGuardNext