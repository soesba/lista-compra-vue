import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"

const searchArticulo = async (request: string): Promise<ArticuloResponse> => {
	return await API.ArticuloRepository.search(request)
}

export default searchArticulo
