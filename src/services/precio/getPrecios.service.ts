import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"
import OrderRequest from '../commons/models/OrderRequest'

const get = async (orderReq: OrderRequest): Promise<PrecioResponse> => {
	return await API.PrecioRepository.get(orderReq)
}

export default get
