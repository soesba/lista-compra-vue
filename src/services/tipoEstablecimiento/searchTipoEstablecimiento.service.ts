import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"
import OrderRequest from '../commons/models/OrderRequest'

const searchTipoEstablecimiento = async (request: string, orderReq: OrderRequest): Promise<TipoEstablecimientoResponse> => {
	return await API.TipoEstablecimientoRepository.search(request, orderReq)
}

export default searchTipoEstablecimiento
