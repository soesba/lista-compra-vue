import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"

const getById = async (request: string): Promise<TipoUnidadResponse> => {
	return await API.TipoUnidadRepository.getById(request)
}

export default getById
