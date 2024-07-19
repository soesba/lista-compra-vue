import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"

const deleteItem = async (id: string): Promise<EstablecimientoResponse> => {
  return await API.EstablecimientoRepository.delete(id)
}

export default deleteItem
