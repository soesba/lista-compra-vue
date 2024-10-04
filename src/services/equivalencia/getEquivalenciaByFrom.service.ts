import API from "@/api"
import type EquivalenciaResponse from "./models/EquivalenciaResponse"

const getByFrom = async (request: string): Promise<EquivalenciaResponse> => {
  return await API.EquivalenciaRepository.getByFrom(request)
}

export default getByFrom
