import type PrecioRequest from "@/services/precio/models/PrecioRequest"
import type PrecioResponse from "@/services/precio/models/PrecioResponse"

export default interface PrecioRepository {
  get(): Promise<PrecioResponse>;
  getById(id: string): Promise<PrecioResponse>;
  getByAny(request: string): Promise<PrecioResponse>;
  insert(request: PrecioRequest): Promise<PrecioResponse>;
  update(request: PrecioRequest): Promise<PrecioResponse>;
  delete(id: string): Promise<PrecioResponse>;
}