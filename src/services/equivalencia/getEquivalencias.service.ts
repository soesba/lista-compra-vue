import API from '@/api'
import EquivalenciaResponse from './models/EquivalenciaResponse'

const getEquivalencias = async (): Promise<EquivalenciaResponse> => {
	return await API.EquivalenciaRepository.get()
}

export default getEquivalencias
