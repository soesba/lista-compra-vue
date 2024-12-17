import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"
import type TipoUnidadRequest from "./models/TipoUnidadRequest"

const update = async (request: TipoUnidadRequest): Promise<TipoUnidadResponse> => {
	return await API.TipoUnidadRepository.update(request)
}

export default update
