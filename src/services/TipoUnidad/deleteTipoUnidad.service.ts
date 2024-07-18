import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"

const deleteItem = async (id: string): Promise<TipoUnidadResponse> => {
  return await API.TipoUnidadRepository.delete(id)
}

export default deleteItem
