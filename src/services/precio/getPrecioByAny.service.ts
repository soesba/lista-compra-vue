import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"

const getByAny = async (request: string): Promise<PrecioResponse> => {
  return await API.PrecioRepository.getByAny(request)
}

export default getByAny
