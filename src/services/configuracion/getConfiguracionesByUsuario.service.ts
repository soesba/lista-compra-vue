import API from '@/api'
import ConfiguracionResponse from './models/ConfiguracionResponse'

const getConfiguracionesByUsuarioId = async (userId: string): Promise<ConfiguracionResponse> => {
  return await API.ConfiguracionRepository.getConfiguracionesByUsuarioId(userId)
}

export default getConfiguracionesByUsuarioId
