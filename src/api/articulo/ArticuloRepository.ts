import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"
import type ArticuloResponse from "@/services/articulo/models/ArticuloResponse"
import CheckDataResponse from '../commons/dto/CheckDataResponseDTO';
import OrderRequest from '@/services/commons/models/OrderRequest';

export default interface ArticuloRepository {
	get(orderReq: OrderRequest): Promise<ArticuloResponse>;
	getById(id: string): Promise<ArticuloResponse>;
	search(request: string, orderReq: OrderRequest): Promise<ArticuloResponse>;
	insert(request: ArticuloRequest): Promise<ArticuloResponse>;
	update(request: ArticuloRequest): Promise<ArticuloResponse>;
	delete(id: string): Promise<ArticuloResponse>;
	checkData(): Promise<CheckDataResponse>;
}
