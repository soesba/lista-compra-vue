import API from "@/api"
import type CompraResponse from "./models/CompraResponse"

const getById = async (id: string): Promise<CompraResponse> => {
  return await API.CompraRepository.getById(id)
}

export default getById
