import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"

const get = async (): Promise<ArticuloResponse> => {
	return await API.ArticuloRepository.get()
}

export default get
