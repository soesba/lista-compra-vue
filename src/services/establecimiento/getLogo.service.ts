import API from '@/api'

const getLogo = async (id: string): Promise<any> => {
	return await API.EstablecimientoRepository.getLogo(id)
}

export default getLogo
