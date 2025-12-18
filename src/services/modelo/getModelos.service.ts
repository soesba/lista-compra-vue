import API from '@/api'
import ModeloResponse from './models/ModeloResponse'

const getModelos = async (): Promise<ModeloResponse> => {
  return await API.ModeloRepository.get()
}

export default getModelos
