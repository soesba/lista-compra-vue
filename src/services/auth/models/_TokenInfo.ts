export default abstract class TokenInfo {
  protected _accessToken: string;
  protected _refreshToken: string;
  protected _expiredToken: Date | null;

  constructor () {
    this._accessToken = ''
    this._refreshToken = ''
    this._expiredToken = null
  }

  set accessToken (accessToken: string) {
    this._accessToken = accessToken
    this.setAccessTokenSaved()
  }

  get accessToken (): string {
    return this._accessToken || this.getAccessTokenSaved()
  }

  set refreshToken (refreshToken: string) {
    this._refreshToken = refreshToken
    this.setRefreshTokenSaved()
  }

  get refreshToken (): string {
    return this._refreshToken || this.getRefreshTokenSaved()
  }

  set expiredToken (expiredToken: Date | null) {
    this._expiredToken = expiredToken
  }

  get expiredToken (): Date | null {
    return this._expiredToken || this.getExpiredTokenSaved()
  }

  removeAll () {
    this._accessToken = ''
    this._refreshToken = ''
    this._expiredToken = null
    this._removeAll()
  }

  protected abstract _removeAll(): void

  protected abstract getAccessTokenSaved(): string
  protected abstract getRefreshTokenSaved(): string
  protected abstract getExpiredTokenSaved(): Date | null

  protected abstract setAccessTokenSaved(): void
  protected abstract setRefreshTokenSaved(): void
}
