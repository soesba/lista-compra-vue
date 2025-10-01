import type { Guard, Next } from './Guard'
import type { RouteLocationNormalized } from 'vue-router'
import { authStore } from '@/store/instances'

export const isAuth: Guard = async (to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: Next) => {

  const isUserAuthenticate = authStore.isAuthenticated
  const isUserSessionAuthenticate = authStore.isAuthenticatedUser
  console.log('Estoy en isAuth', isUserAuthenticate, isUserSessionAuthenticate)
  if (isUserAuthenticate && isUserSessionAuthenticate) {
    next()
  } else if (isUserAuthenticate && !isUserSessionAuthenticate) {
    if (to.path !== '/') {
      next('/')
    } else {
      console.log('Voy a next desde', from)
      next()
    }
  } else {
    console.log('Voy a login')
    next('login')
  }
}
