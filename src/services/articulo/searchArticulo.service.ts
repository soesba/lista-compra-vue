import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"
import OrderRequest from '../commons/models/OrderRequest'

const searchArticulo = async (request: string, orderReq: OrderRequest): Promise<ArticuloResponse> => {
	return await API.ArticuloRepository.search(request, orderReq)
}

export default searchArticulo
