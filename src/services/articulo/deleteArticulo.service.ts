import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"

const deleteItem = async (id: string): Promise<ArticuloResponse> => {
  return await API.ArticuloRepository.delete(id)
}

export default deleteItem
