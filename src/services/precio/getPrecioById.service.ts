import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"

const getById = async (id: string): Promise<PrecioResponse> => {
  return await API.PrecioRepository.getById(id)
}

export default getById
