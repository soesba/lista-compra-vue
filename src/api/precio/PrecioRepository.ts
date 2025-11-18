import type PrecioRequest from "@/services/precio/models/PrecioRequest"
import type PrecioResponse from "@/services/precio/models/PrecioResponse"
import CheckDataResponse from '../commons/CheckDataResponse';

export default interface PrecioRepository {
  get(): Promise<PrecioResponse>;
  getById(id: string): Promise<PrecioResponse>;
  getByArticuloId(id: string): Promise<PrecioResponse>;
  search(request: string): Promise<PrecioResponse>;
  insert(request: PrecioRequest): Promise<PrecioResponse>;
  update(request: PrecioRequest): Promise<PrecioResponse>;
  delete(id: string): Promise<PrecioResponse>;
  checkData(): Promise<CheckDataResponse>;
}
