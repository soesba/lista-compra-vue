import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest";
import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"
import CheckDataResponse from '../commons/CheckDataResponse';

export default interface TipoUnidadRepository {
  get(): Promise<TipoUnidadResponse>;
  search(request: string): Promise<TipoUnidadResponse>;
  getById(id: string): Promise<TipoUnidadResponse>;
  insert(request: TipoUnidadRequest): Promise<TipoUnidadResponse>;
  update(request: TipoUnidadRequest): Promise<TipoUnidadResponse>;
  delete(id: string): Promise<TipoUnidadResponse>;
  checkData(): Promise<CheckDataResponse>;
}
