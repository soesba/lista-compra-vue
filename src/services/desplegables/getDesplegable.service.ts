import API from "@/api"
import type ItemResponse from "./models/ItemResponse"

const get = async (tipoDato: string): Promise<ItemResponse> => {
  return await API.DesplegableRepository.get(tipoDato)
}

export default get
