import API from "@/api"
import TipoEstablecimientoResponseO from './models/TipoEstablecimientoResponse'

const getTipoEstablecimientoById = async (id: string): Promise<TipoEstablecimientoResponseO> => {
	return await API.TipoEstablecimientoRepository.getById(id)
}

export default getTipoEstablecimientoById
