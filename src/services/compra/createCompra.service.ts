import API from "@/api"
import type CompraResponse from "./models/CompraResponse"
import type CompraRequest from "./models/CompraRequest"

const create = async (request: CompraRequest): Promise<CompraResponse> => {
  return await API.CompraRepository.insert(request)
}

export default create
