import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"
import type TipoEstablecimientoRequest from "./models/TipoEstablecimientoRequest"

const create = async (request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse> => {
	return await API.TipoEstablecimientoRepository.insert(request)
}

export default create
