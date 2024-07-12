import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"

const get = async (): Promise<TipoUnidadResponse> => {
  return await API.TipoUnidadRepository.get()
}

export default get
