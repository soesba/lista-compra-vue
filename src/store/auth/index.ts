import API from '@/api'
import LoginResponse from '@/services/auth/models/LoginResponse'
import UserInfo from '@/services/auth/models/UserInfo'
import axios from 'axios'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

const config = {
  appAccessToken: import.meta.env.VITE_ACCESS_TOKEN,
  appRefreshToken: import.meta.env.VITE_REFRESH_TOKEN,
  appCode: import.meta.env.VITE_CODE,
  redirectSuccess: window.location.href,
  redirectError: import.meta.env.VITE_REDIRECT_ERROR || window.location.origin + '/forbidden',
}
const buildExpirationDate = (token: string) => {
  if (!token) {
    console.warn('Unable to set expiration date due to empty access_token')
    return null
  }

  const jsonToken = decodeJwt(token)
  return new Date(jsonToken.exp * 1000)
}

const decodeJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}

const removeAll = (): void => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    const neededAttributes = {
      domain: window.location.hostname
    }

    Cookies.remove(cookieName, neededAttributes)
  })
}

const getDefaultState = () => {
  return {
    token: Cookies.get(config.appAccessToken) || '',
    refresh_token: Cookies.get(config.appRefreshToken) || '',
    usuario: JSON.parse(Cookies.get('usuario') || 'null'),
    preferencias: null as any,
    isRefreshing: false,
    failedQueue: [] as any[]
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => getDefaultState(),
  actions: {
    setToken(newToken: string) {
      this.token = newToken
    },
    setRefreshToken(newRefreshToken: string) {
      this.refresh_token = newRefreshToken
    },
    setUsuario(newUser: UserInfo) {
      this.usuario = newUser
    },
    setPreferencias(preferencias: any) {
      this.preferencias = preferencias
    },
    async login(username: string, password: string) {
      const response: LoginResponse = await API.AuthRepository.login(username, password)
      if (response.status === 200) {
        this.setToken(response.data.access_token)
        this.setRefreshToken(response.data.refresh_token)
        this.setUsuario(response.data.usuario)
        this.setPreferencias(response.data.usuario.preferencias)
        // Guardar tokens en cookies
        Cookies.set(config.appAccessToken, response.data.access_token, { domain: window.location.hostname, secure: true })
        Cookies.set(config.appRefreshToken, response.data.refresh_token, { domain: window.location.hostname, secure: true })
        Cookies.set('usuario', JSON.stringify(response.data.usuario), { domain: window.location.hostname, secure: true })
        return true
      } else {
        throw new Error('Error al iniciar sesión')
      }
    },
    async refreshToken() {
      const refreshToken = this.getRefreshTokenSaved
      if (!refreshToken) {
        this.logout()
        throw new Error('No refresh token available')
      }
      const response: LoginResponse = await API.AuthRepository.refresh(refreshToken)
      if (response.status === 200) {
        this.setToken(response.data.access_token)
        this.setRefreshToken(response.data.refresh_token)
        // Guardar token en local storage para persistencia
        Cookies.set(config.appAccessToken, response.data.access_token, { domain: window.location.hostname, secure: true })
        Cookies.set(config.appRefreshToken, response.data.refresh_token, { domain: window.location.hostname, secure: true })
        return response.data.access_token
      } else {
        throw new Error('Error al refrescar el token')
      }
    },
    async handle401Error(error: any) {
      const originalRequest = error.config;

      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        }).then((token: any) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        });
      }

      this.isRefreshing = true;

      try {
        const newToken = await this.refreshToken()
        this.failedQueue.forEach(prom => prom.resolve(newToken));
        this.failedQueue = [];
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        this.failedQueue.forEach(prom => prom.reject(err));
        this.failedQueue = [];
        throw err;
      } finally {
        this.isRefreshing = false;
      }
    },
    resetState(state: any) {
      state = getDefaultState()
    },
    logout() {
      console.log('Cerrando sesión')
      this.resetState(this.$state)
      removeAll()
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getAccesTokenSaved: (state) => state.token,
    getRefreshTokenSaved: (state) => state.refresh_token,
    getExpiredTokenSaved: (state) => buildExpirationDate(state.token) || null,
    isAuthenticatedUser: (state) => state.usuario !== undefined && state.usuario !== null,
    getUsuarioLogueado: (state) => state.usuario,
    getPreferencias: (state) => state.preferencias
  }
})