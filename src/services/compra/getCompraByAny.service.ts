import API from "@/api"
import type CompraResponse from "./models/CompraResponse"

const getByAny = async (request: string): Promise<CompraResponse> => {
  return await API.CompraRepository.getByAny(request)
}

export default getByAny
