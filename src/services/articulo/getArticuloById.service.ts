import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"

const getById = async (id: string): Promise<ArticuloResponse> => {
  return await API.ArticuloRepository.getById(id)
}

export default getById
