import API from "@/api"
import type EstablecimientoResponse from "./models/EstablecimientoResponse"
import OrderRequest from '../commons/models/OrderRequest'

const get = async (orderReq: OrderRequest): Promise<EstablecimientoResponse> => {
	return await API.EstablecimientoRepository.get(orderReq)
}

export default get
