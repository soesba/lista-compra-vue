import type Xhr from "@/api/config/Xhr"
import type Interceptor from "./Interceptor"
import { uiStore } from "@/main"

export default class InterceptorMessages implements Interceptor {
  constructor(private xhrs: Xhr) {
    console.log('Se ha creado el interceptor para los mensajes de usuario')
  }

  execute(): void {
    const axiosInstance = this.xhrs.getAxios()

    // Request interceptor
    axiosInstance.interceptors.request.use(config => {
      // Modify the request config here
      return config
    })

    // Response interceptor
    axiosInstance.interceptors.response.use((response) => {
      console.log("🚀 ~ InterceptorMessages ~ axiosInstance.interceptors.response.use ~ response:", response)
      // Handle the response here
      if (response.status !== 200) {
        console.log("🚀 ~ InterceptorMessages ~ axiosInstance.interceptors.response.use ~ response.status:", response.status)
        
      }
      return response
    }, (error) => {
      // Handle errors here
      uiStore.showAlertComponent({
        text: error.response.data.message,
        type: 'error'
      })
      console.error(error)
      return Promise.reject(error)
    })        
  }
}