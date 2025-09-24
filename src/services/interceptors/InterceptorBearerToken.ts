import Xhr from '@/api/config/Xhr'
import Interceptor from './Interceptor'
import TokenInfo from '../auth/TokenInfo'

export default class InterceptorBearerToken implements Interceptor {
  constructor (private xhrs: Xhr, private tokenService: TokenInfo) {
    console.log('Se ha creado el interceptor para el bearer token')
  }

  execute (): void {
      const axiosInstance = this.xhrs.getAxios()

      axiosInstance.interceptors.request.use(config => {
        const token = this.tokenService.accessToken

        if (token) {
          config.headers.Authorization = 'Bearer ' + token
        }

        return config
      })
  }
}
