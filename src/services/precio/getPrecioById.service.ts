import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"

const getPrecioById = async (id: string): Promise<PrecioResponse> => {
  return await API.PrecioRepository.getById(id)
}

export default getPrecioById
