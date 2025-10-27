import API from '@/api'
import ConfiguracionResponse from './models/ConfiguracionResponse'

const getConfiguracionesByCategoria = async (categoria: string): Promise<ConfiguracionResponse> => {
  return await API.ConfiguracionRepository.getConfiguracionesByCategoria(categoria)
}

export default getConfiguracionesByCategoria
