import API from '@/api'
import EquivalenciaResponse from './models/EquivalenciaResponse'
import Equivalencia from './models/Equivalencia'

const save = async (request: Equivalencia[]): Promise<EquivalenciaResponse> => {
  return await API.EquivalenciaRepository.save(request)
}

export default save
