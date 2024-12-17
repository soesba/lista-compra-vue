import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"
import type PrecioRequest from "./models/PrecioRequest"

const update = async (request: PrecioRequest): Promise<PrecioResponse> => {
	return await API.PrecioRepository.update(request)
}

export default update
