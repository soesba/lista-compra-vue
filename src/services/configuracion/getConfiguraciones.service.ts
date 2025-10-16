import API from '@/api'
import ConfiguracionResponse from './models/ConfiguracionResponse'

const get = async (): Promise<ConfiguracionResponse> => {
  return await API.ConfiguracionRepository.getConfiguraciones()
}

export default get
