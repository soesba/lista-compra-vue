import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest";
import type TipoEstablecimientoResponse from "@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse"

export default interface TipoEstablecimientoRepository {
  get(): Promise<TipoEstablecimientoResponse>;
  getByAny(request: string): Promise<TipoEstablecimientoResponse>;
  insert(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse>;
  update(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse>;
  delete(id: string): Promise<TipoEstablecimientoResponse>;
}