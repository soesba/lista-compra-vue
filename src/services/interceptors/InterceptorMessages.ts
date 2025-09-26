import type Xhr from "@/api/config/Xhr"
import type Interceptor from "./Interceptor"
import { uiStore } from "@/main"
import { useAuthStore } from '@/store/auth'

export default class InterceptorMessages implements Interceptor {
  private _token: string = ''

  constructor(private xhrs: Xhr, private token: string) {
    console.log('Se ha creado el interceptor de mensajes')
    this._token = token
  }

  execute(): void {
    const axiosInstance = this.xhrs.getAxios()

    // Request interceptor
    axiosInstance.interceptors.request.use(config => {
      // Modify the request config here
      if (this._token) {
        config.headers.Authorization = 'Bearer ' + this._token
      }
      return config
    })

    // Response interceptor
    axiosInstance.interceptors.response.use((response) => {
      // console.log("🚀 ~ InterceptorMessages ~ axiosInstance.interceptors.response.use ~ response:", response)
      // Handle the response here
      if (response.status !== 200) {
        uiStore.showAlertComponent({
          text: response.data.message,
          type: 'error'
        })
        return Promise.reject(response);
      }
      return response
    }, (error) => {
      // Handle errors here
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const authStore = useAuthStore();
      if (error.response?.status === 401) {
        return authStore.handle401Error(error);
      } else {

        uiStore.showAlertComponent({
          text: error.response.data.message || error.message,
          type: 'error'
        })
      }
      console.error(error)
      return Promise.reject(error);
    })
  }
}
