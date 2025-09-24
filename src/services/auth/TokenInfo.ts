import Cookies from 'js-cookie'
import TokenService from './models/_TokenInfo'

export default class TokenInfo extends TokenService {
  private config = {
    appAccessToken:  import.meta.env.VITE_ACCESS_TOKEN,
    appRefreshToken:  import.meta.env.VITE_REFRESH_TOKEN,
    appCode:  import.meta.env.VITE_CODE,
    redirectSuccess: window.location.href,
    redirectError:  import.meta.env.VITE_REDIRECT_ERROR || window.location.origin + '/forbidden',
  }
  protected setAccessTokenSaved (): void {
    Cookies.set(this.config.appAccessToken, this._accessToken, { domain: window.location.hostname, secure: true })
    this._expiredToken = this.buildExpirationDate(this._accessToken)
  }

  protected setRefreshTokenSaved (): void {
    Cookies.set(this.config.appRefreshToken, this._refreshToken, { domain: window.location.hostname, secure: true })
  }

  getAccessTokenSaved (): string {
    return Cookies.get(this.config.appAccessToken) || ''
  }

  getRefreshTokenSaved (): string {
    return Cookies.get(this.config.appRefreshToken) || ''
  }

  getExpiredTokenSaved (): Date | null {
    return this.buildExpirationDate(this._accessToken) || null
  }

  _removeAll (): void {
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      const neededAttributes = {
        path: '',
        domain: window.location.hostname
      }

      Cookies.remove(cookieName, neededAttributes)
    })
  }

  private buildExpirationDate (token: string) {
    if (!token) {
      console.warn('Unable to set expiration date due to empty access_token')
      return null
    }

    const jsonToken = this.decodeJwt(token)
    return new Date(jsonToken.exp * 1000)
  }

  private decodeJwt (token: string) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(window.atob(base64))
  }
}
