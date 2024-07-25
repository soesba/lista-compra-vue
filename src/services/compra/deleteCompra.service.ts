import API from "@/api"
import type CompraResponse from "./models/CompraResponse"

const deleteItem = async (id: string): Promise<CompraResponse> => {
  return await API.CompraRepository.delete(id)
}

export default deleteItem
