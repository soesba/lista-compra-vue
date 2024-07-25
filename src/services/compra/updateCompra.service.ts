import API from "@/api"
import type CompraResponse from "./models/CompraResponse"
import type CompraRequest from "./models/CompraRequest"

const update = async (request: CompraRequest): Promise<CompraResponse> => {
  return await API.CompraRepository.update(request)
}

export default update
