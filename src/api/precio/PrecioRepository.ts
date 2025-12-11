import CheckDataResponse from '@/services/commons/models/CheckDataResponse';
import OrderRequest from '@/services/commons/models/OrderRequest';
import type PrecioRequest from "@/services/precio/models/PrecioRequest"
import type PrecioResponse from "@/services/precio/models/PrecioResponse"
import UnidadMedida from '@/services/precio/models/UnidadMedida';

export default interface PrecioRepository {
  get(orderReq: OrderRequest): Promise<PrecioResponse>;
  getById(id: string): Promise<PrecioResponse>;
  getByArticuloId(id: string): Promise<PrecioResponse>;
  search(request: string, orderReq: OrderRequest): Promise<PrecioResponse>;
  insert(request: PrecioRequest): Promise<PrecioResponse>;
  update(request: PrecioRequest): Promise<PrecioResponse>;
  updateUnidadesMedida(precioId: string, unidades: Array<UnidadMedida>): Promise<PrecioResponse>;
  delete(id: string): Promise<PrecioResponse>;
  checkData(): Promise<CheckDataResponse>;
}
