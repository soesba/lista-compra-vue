import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"

const get = async (): Promise<PrecioResponse> => {
	return await API.PrecioRepository.get()
}

export default get
