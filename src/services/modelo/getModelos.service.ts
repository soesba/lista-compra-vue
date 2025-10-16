import API from '@/api'
import ModeloResponse from './models/ModeloResponse'

const get = async (): Promise<ModeloResponse> => {
  return await API.ModeloRepository.get()
}

export default get
