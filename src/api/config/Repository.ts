import env from '@/services/environment'
import Xhr from './Xhr'

const baseUrl = env.getEnvVariable('BASE_URL') + ':' +  env.getEnvVariable('PORT')

const xhr = Xhr.builder()
.setBaseUrl(baseUrl)
// .setHeaders({})
.build()

export { xhr }