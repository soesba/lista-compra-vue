import API from '@/api'
import ModeloResponse from './models/ModeloResponse'

const getModeloByNombre = async (nombre: string): Promise<ModeloResponse> => {
  return await API.ModeloRepository.getByNombre(nombre)
}

export default getModeloByNombre
