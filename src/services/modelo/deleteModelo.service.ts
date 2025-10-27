import API from '@/api'
import ModeloResponse from './models/ModeloResponse'

const deleteModelo = async (modeloId: string): Promise<ModeloResponse> => {
  return await API.ModeloRepository.deleteModelo(modeloId)
}

export default deleteModelo
