import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"

const searchTipoEstablecimiento = async (request: string): Promise<TipoEstablecimientoResponse> => {
	return await API.TipoEstablecimientoRepository.search(request)
}

export default searchTipoEstablecimiento
