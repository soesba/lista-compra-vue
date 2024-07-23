import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"

const getById = async (id: string): Promise<EstablecimientoResponse> => {
  return await API.EstablecimientoRepository.getById(id)
}

export default getById
