import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"
import type EstablecimientoRequest from "./models/EstablecimientoRequest"

const create = async (request: EstablecimientoRequest): Promise<EstablecimientoResponse> => {
  return await API.EstablecimientoRepository.insert(request)
}

export default create
