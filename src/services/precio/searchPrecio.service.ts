import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"

const searchPrecio = async (request: string): Promise<PrecioResponse> => {
	return await API.PrecioRepository.search(request)
}

export default searchPrecio
