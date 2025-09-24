import API from '@/api'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

const config = {
  appAccessToken:  import.meta.env.VITE_ACCESS_TOKEN,
  appRefreshToken:  import.meta.env.VITE_REFRESH_TOKEN,
  appCode:  import.meta.env.VITE_CODE,
  redirectSuccess: window.location.href,
  redirectError:  import.meta.env.VITE_REDIRECT_ERROR || window.location.origin + '/forbidden',
}

const buildExpirationDate = (token: string) => {
  if (!token) {
    console.warn('Unable to set expiration date due to empty access_token')
    return null
  }

  const jsonToken = decodeJwt(token)
  return new Date(jsonToken.exp * 1000)
}

const decodeJwt = (token: string) =>{
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}

const removeAll = (): void => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    const neededAttributes = {
      path: '',
      domain: window.location.hostname
    }

    Cookies.remove(cookieName, neededAttributes)
  })
}

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    token: '',
    user: ''
  }),
  actions: {
    setToken(newToken: any) {
      this.token = newToken
    },

    setUser(newUser: any) {
      this.user = newUser
    },

    async login(username: string, password: string) {
      const response = await API.AuthRepository.login(username, password)
      if (response.status === 200) {
        this.setToken(response.data.access_token)
        this.setUser(username)
        // Guardar token en local storage para persistencia
        Cookies.set(config.appAccessToken, this.token, { domain: window.location.hostname, secure: true })
        return true
      } else {
        throw new Error('Error al iniciar sesión')
      }
    },

    logout() {
        this.token = ''
        this.user = ''
        removeAll()
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getAccesTokenSaved: () => Cookies.get(config.appAccessToken) || '',
    getRefreshTokenSaved: () => Cookies.get(config.appRefreshToken) || '',
    getExpiredTokenSaved: () => buildExpirationDate(Cookies.get(config.appAccessToken) || '') || null,
    isAuthenticatedUser: (state) => state.user !== undefined && state.user !== null && state.user !== ''
  }
})