import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"

const searchEstablecimiento = async (request: string): Promise<EstablecimientoResponse> => {
	return await API.EstablecimientoRepository.search(request)
}

export default searchEstablecimiento
