import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"
import OrderRequest from '../commons/models/OrderRequest'

const searchEstablecimiento = async (request: string, orderReq: OrderRequest): Promise<EstablecimientoResponse> => {
	return await API.EstablecimientoRepository.search(request, orderReq)
}

export default searchEstablecimiento
