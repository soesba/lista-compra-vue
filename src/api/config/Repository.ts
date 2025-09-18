import Xhr from './Xhr'

// const baseUrl = import.meta.env.VITE_BASE_URL + ':' + import.meta.env.VITE_PORT
const baseUrl = import.meta.env.MODE === 'development' ? import.meta.env.VITE_BASE_URL + ':' + import.meta.env.VITE_PORT : import.meta.env.VITE_BASE_URL

const xhr = Xhr.builder()
	.setBaseUrl(baseUrl)
// .setHeaders({})
	.build()

export { xhr }
