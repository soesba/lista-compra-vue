import CheckDataResponse from '@/services/commons/models/CheckDataResponse';
import Imagen from '@/services/commons/models/Imagen';
import OrderRequest from '@/services/commons/models/OrderRequest';
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest";
import type EstablecimientoResponse from "@/services/establecimiento/models/EstablecimientoResponse"

export default interface EstablecimientoRepository {
  get(orderReq: OrderRequest): Promise<EstablecimientoResponse>;
  getById(id: string): Promise<EstablecimientoResponse>;
  getLogo(id: string): Promise<Imagen>;
  search(request: string, orderReq: OrderRequest): Promise<EstablecimientoResponse>;
  insert(request: EstablecimientoRequest): Promise<EstablecimientoResponse>;
  update(request: EstablecimientoRequest): Promise<EstablecimientoResponse>;
  delete(id: string): Promise<EstablecimientoResponse>;
  checkData(): Promise<CheckDataResponse>;
}
