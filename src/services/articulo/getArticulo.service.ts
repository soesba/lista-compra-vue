import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"
import OrderRequest from '../commons/models/OrderRequest'

const get = async (orderReq: OrderRequest): Promise<ArticuloResponse> => {
	return await API.ArticuloRepository.get(orderReq)
}

export default get
