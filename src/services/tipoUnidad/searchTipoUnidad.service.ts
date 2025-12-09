import API from "@/api"
import type TipoUnidadResponse from "./models/TipoUnidadResponse"
import OrderRequest from '../commons/models/OrderRequest'

const searchTipoUnidad = async (request: string, orderReq: OrderRequest): Promise<TipoUnidadResponse> => {
	return await API.TipoUnidadRepository.search(request, orderReq)
}

export default searchTipoUnidad
