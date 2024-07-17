import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"

const getByAny = async (request: string): Promise<TipoUnidadResponse> => {
  return await API.TipoUnidadRepository.getByAny(request)
}

export default getByAny
