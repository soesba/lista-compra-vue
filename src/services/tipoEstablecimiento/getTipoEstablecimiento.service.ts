import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"
import OrderRequest from '../commons/models/OrderRequest'

const get = async (orderReq: OrderRequest): Promise<TipoEstablecimientoResponse> => {
	return await API.TipoEstablecimientoRepository.get(orderReq)
}

export default get
