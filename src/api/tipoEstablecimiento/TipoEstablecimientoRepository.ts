import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest";
import type TipoEstablecimientoResponse from "@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse"
import CheckDataResponse from '../commons/CheckDataResponse';

export default interface TipoEstablecimientoRepository {
  get(): Promise<TipoEstablecimientoResponse>;
  getById(id: string): Promise<TipoEstablecimientoResponse>;
  search(request: string): Promise<TipoEstablecimientoResponse>;
  insert(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse>;
  update(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse>;
  delete(id: string): Promise<TipoEstablecimientoResponse>;
  checkData(): Promise<CheckDataResponse>
}
