import API from "@/api"
import type EquivalenciaResponse from "./models/EquivalenciaResponse"

const getByFromMultiple = async (ids: Array<string>): Promise<EquivalenciaResponse> => {
  return await API.EquivalenciaRepository.getByFromMultiple(ids)
}

export default getByFromMultiple
