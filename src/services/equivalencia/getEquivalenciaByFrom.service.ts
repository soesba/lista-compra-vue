import API from "@/api"
import type EquivalenciaResponse from "./models/EquivalenciaResponse"

const getByFrom = async (id: string): Promise<EquivalenciaResponse> => {
	return await API.EquivalenciaRepository.getByFrom(id)
}

export default getByFrom
