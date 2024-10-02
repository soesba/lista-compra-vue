import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"

const getArticuloById = async (id: string): Promise<ArticuloResponse> => {
  return await API.ArticuloRepository.getById(id)
}

export default getArticuloById
