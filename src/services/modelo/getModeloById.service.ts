import API from '@/api'
import ModeloResponse from './models/ModeloResponse'

const getModeloById = async (id: string): Promise<ModeloResponse> => {
  return await API.ModeloRepository.getById(id)
}

export default getModeloById
