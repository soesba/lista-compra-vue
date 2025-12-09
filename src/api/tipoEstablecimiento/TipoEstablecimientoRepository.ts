import CheckDataResponse from '@/services/commons/models/CheckDataResponse';
import OrderRequest from '@/services/commons/models/OrderRequest';
import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest";
import type TipoEstablecimientoResponse from "@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse"

export default interface TipoEstablecimientoRepository {
  get(orderReq: OrderRequest): Promise<TipoEstablecimientoResponse>;
  getById(id: string): Promise<TipoEstablecimientoResponse>;
  search(request: string, orderReq: OrderRequest): Promise<TipoEstablecimientoResponse>;
  insert(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse>;
  update(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse>;
  delete(id: string): Promise<TipoEstablecimientoResponse>;
  checkData(): Promise<CheckDataResponse>
}
