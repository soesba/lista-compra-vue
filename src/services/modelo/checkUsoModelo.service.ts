import API from '@/api'
import ModeloResponse from './models/ModeloResponse'

const checkUsoModelo = async (modeloId: string): Promise<ModeloResponse> => {
  return await API.ModeloRepository.checkUso(modeloId)
}

export default checkUsoModelo
