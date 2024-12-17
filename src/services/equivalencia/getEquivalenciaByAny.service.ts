import API from "@/api"
import type EquivalenciaResponse from "./models/EquivalenciaResponse"

const getByAny = async (id: string): Promise<EquivalenciaResponse> => {
	return await API.EquivalenciaRepository.getByAny(id)
}

export default getByAny
