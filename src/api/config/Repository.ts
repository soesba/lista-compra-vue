import Xhr from './Xhr'

// const baseUrl = import.meta.env.VITE_BASE_URL + ':' + import.meta.env.VITE_PORT
const baseUrl = import.meta.env.MODE === 'development' ? import.meta.env.VITE_BASE_URL + ':' + import.meta.env.VITE_PORT : import.meta.env.VITE_BASE_URL
const headers = { 'Content-Type': 'application/json;charset=UTF-8'}
const xhr: Xhr = Xhr.builder()
	.setBaseUrl(baseUrl)
	.setHeaders(headers)
	.build()

export { xhr }
