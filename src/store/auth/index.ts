import API from '@/api'
import router from '@/router'
import LoginResponse from '@/services/auth/models/LoginResponse'
import axios from 'axios'
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
      domain: window.location.hostname
    }

    Cookies.remove(cookieName, neededAttributes)
  })
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    refresh_token: '',
    user: '',
    isRefreshing: false,
    failedQueue: [] as any[]
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken
    },

    setRefreshToken(newRefreshToken: string) {
      this.refresh_token = newRefreshToken
    },

    setUser(newUser: string) {
      this.user = newUser
    },

    async login(username: string, password: string) {
      const response: LoginResponse = await API.AuthRepository.login(username, password)
      if (response.status === 200) {
        this.setToken(response.data.access_token)
        this.setRefreshToken(response.data.refresh_token)
        this.setUser(username)
        // Guardar tokens en local storage para persistencia
        Cookies.set(config.appAccessToken, this.token, { domain: window.location.hostname, secure: true })
        Cookies.set(config.appRefreshToken, this.refresh_token, { domain: window.location.hostname, secure: true })
        console.log(this.getAccesTokenSaved, this.getRefreshTokenSaved)
        return true
      } else {
        throw new Error('Error al iniciar sesión')
      }
    },

    async refreshToken() {
      const response: LoginResponse = await API.AuthRepository.refresh(this.getRefreshTokenSaved)
      if (response.status === 200) {
        this.setToken(response.data.access_token)
        this.setRefreshToken(response.data.refresh_token)
        // Guardar token en local storage para persistencia
        Cookies.set(config.appAccessToken, this.token, { domain: window.location.hostname, secure: true })
        Cookies.set(config.appRefreshToken, this.refresh_token, { domain: window.location.hostname, secure: true })
        console.log(this.getAccesTokenSaved, this.getRefreshTokenSaved)
        return this.getAccesTokenSaved
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

    logout() {
      console.log('Cerrando sesión')
      this.token = ''
      this.refresh_token = ''
      this.user = ''
      removeAll()
      router.push('/login')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getAccesTokenSaved: (state) => state.token || Cookies.get(config.appAccessToken) || '',
    getRefreshTokenSaved: (state) => state.refresh_token || Cookies.get(config.appRefreshToken) || '',
    getExpiredTokenSaved: (state) => buildExpirationDate(state.token || Cookies.get(config.appAccessToken) || '') || null,
    isAuthenticatedUser: (state) => state.user !== undefined && state.user !== null && state.user !== ''
  }
})