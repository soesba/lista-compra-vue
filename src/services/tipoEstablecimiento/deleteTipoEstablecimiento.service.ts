import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"

const deleteItem = async (id: string): Promise<TipoEstablecimientoResponse> => {
  return await API.TipoEstablecimientoRepository.delete(id)
}

export default deleteItem
