import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"

const searchTipoUnidad = async (request: string): Promise<TipoUnidadResponse> => {
	return await API.TipoUnidadRepository.search(request)
}

export default searchTipoUnidad
