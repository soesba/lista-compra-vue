import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"

const getByAny = async (request: string): Promise<TipoEstablecimientoResponse> => {
	return await API.TipoEstablecimientoRepository.getByAny(request)
}

export default getByAny
