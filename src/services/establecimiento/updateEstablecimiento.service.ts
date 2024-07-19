import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"
import type EstablecimientoRequest from "./models/EstablecimientoRequest"

const update = async (request: EstablecimientoRequest): Promise<EstablecimientoResponse> => {
  return await API.EstablecimientoRepository.update(request)
}

export default update
