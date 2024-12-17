import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"
import type TipoEstablecimientoRequest from "./models/TipoEstablecimientoRequest"

const update = async (request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse> => {
	return await API.TipoEstablecimientoRepository.update(request)
}

export default update
