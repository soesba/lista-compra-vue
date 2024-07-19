import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"

const get = async (): Promise<EstablecimientoResponse> => {
  return await API.EstablecimientoRepository.get()
}

export default get
