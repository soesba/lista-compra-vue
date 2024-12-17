import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"

const deleteItem = async (id: string): Promise<PrecioResponse> => {
	return await API.PrecioRepository.delete(id)
}

export default deleteItem
