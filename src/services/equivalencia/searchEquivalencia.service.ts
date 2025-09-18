import API from "@/api"
import type EquivalenciaResponse from "./models/EquivalenciaResponse"

const searchEquivalencia = async (id: string): Promise<EquivalenciaResponse> => {
	return await API.EquivalenciaRepository.search(id)
}

export default searchEquivalencia
