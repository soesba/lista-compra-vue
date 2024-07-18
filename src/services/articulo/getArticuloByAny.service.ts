import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"

const getByAny = async (request: string): Promise<ArticuloResponse> => {
  return await API.ArticuloRepository.getByAny(request)
}

export default getByAny
