import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"
import type ArticuloRequest from "./models/ArticuloRequest"

const create = async (request: ArticuloRequest): Promise<ArticuloResponse> => {
  return await API.ArticuloRepository.insert(request)
}

export default create
