import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"

const getByArticuloId = async (id: string): Promise<PrecioResponse> => {
	return await API.PrecioRepository.getByArticuloId(id)
}

export default getByArticuloId
