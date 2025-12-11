import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"
import OrderRequest from '../commons/models/OrderRequest'

const get = async (orderReq: OrderRequest): Promise<TipoUnidadResponse> => {
	return await API.TipoUnidadRepository.get(orderReq)
}

export default get
