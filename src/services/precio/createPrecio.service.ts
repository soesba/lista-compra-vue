import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"
import type PrecioRequest from "./models/PrecioRequest"

const create = async (request: PrecioRequest): Promise<PrecioResponse> => {
  return await API.PrecioRepository.insert(request)
}

export default create
