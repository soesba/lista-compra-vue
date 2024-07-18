import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest";
import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"

export default interface TipoUnidadRepository {
  get(): Promise<TipoUnidadResponse>;
  getByAny(request: string): Promise<TipoUnidadResponse>;
  insert(request: TipoUnidadRequest): Promise<TipoUnidadResponse>;
  delete(id: string): Promise<TipoUnidadResponse>;
}