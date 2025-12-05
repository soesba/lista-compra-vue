import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"
import OrderRequest from '../commons/models/OrderRequest'

const searchPrecio = async (request: string, orderReq: OrderRequest): Promise<PrecioResponse> => {
	return await API.PrecioRepository.search(request, orderReq)
}

export default searchPrecio
