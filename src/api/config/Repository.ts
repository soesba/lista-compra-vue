import env from '@/services/environment'
import Xhr from './Xhr'

const baseUrl = env.getEnvVariable('BASE_URL') + ':' + env.getEnvVariable('PORT')
console.log('LOG~ ~ :5 ~ baseUrl:', baseUrl)

const xhr = Xhr.builder()
	.setBaseUrl(baseUrl)
// .setHeaders({})
	.build()

export { xhr }
