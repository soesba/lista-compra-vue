import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"
import OrderRequest from '../commons/models/OrderRequest'

const getArticuloWithDetail = async (orderReq: OrderRequest): Promise<ArticuloResponse> => {
	return await API.ArticuloRepository.getWithDetail(orderReq)
}

export default getArticuloWithDetail
