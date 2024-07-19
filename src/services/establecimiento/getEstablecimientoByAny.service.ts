import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"

const getByAny = async (request: string): Promise<EstablecimientoResponse> => {
  return await API.EstablecimientoRepository.getByAny(request)
}

export default getByAny
