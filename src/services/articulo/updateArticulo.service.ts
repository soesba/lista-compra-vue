import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"
import type ArticuloRequest from "./models/ArticuloRequest"

const update = async (request: ArticuloRequest): Promise<ArticuloResponse> => {
  return await API.ArticuloRepository.update(request)
}

export default update
