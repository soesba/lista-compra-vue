import CheckDataResponse from '@/services/commons/models/CheckDataResponse';
import OrderRequest from '@/services/commons/models/OrderRequest';
import EquivalenciaResponse from '@/services/equivalencia/models/EquivalenciaResponse';
import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest";
import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"

export default interface TipoUnidadRepository {
  get(orderReq: OrderRequest): Promise<TipoUnidadResponse>;
  search(request: string, orderReq: OrderRequest): Promise<TipoUnidadResponse>;
  getById(id: string): Promise<TipoUnidadResponse>;
  insert(request: TipoUnidadRequest): Promise<TipoUnidadResponse>;
  update(request: TipoUnidadRequest): Promise<TipoUnidadResponse>;
  delete(id: string): Promise<TipoUnidadResponse>;
  checkData(): Promise<CheckDataResponse>;
  getEquivalencias(id: string): Promise<EquivalenciaResponse>;
}
