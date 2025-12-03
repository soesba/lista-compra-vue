import API from '@/api'
import EquivalenciaResponse from '../equivalencia/models/EquivalenciaResponse'

const getEquivalencias = async (id: string): Promise<EquivalenciaResponse> => {
	return await API.TipoUnidadRepository.getEquivalencias(id)
}

export default getEquivalencias
