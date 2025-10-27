import API from '@/api'
import ConfiguracionResponse from './models/ConfiguracionResponse'

const getConfiguracionById = async (id: string): Promise<ConfiguracionResponse> => {
  return await API.ConfiguracionRepository.getConfiguracionById(id)
}

export default getConfiguracionById
