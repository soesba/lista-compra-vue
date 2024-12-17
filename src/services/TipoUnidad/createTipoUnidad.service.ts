import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"
import type TipoUnidadRequest from "./models/TipoUnidadRequest"

const create = async (request: TipoUnidadRequest): Promise<TipoUnidadResponse> => {
	return await API.TipoUnidadRepository.insert(request)
}

export default create
