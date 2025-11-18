import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest";
import type EstablecimientoResponse from "@/services/establecimiento/models/EstablecimientoResponse"
import CheckDataResponse from '../commons/CheckDataResponse';

export default interface EstablecimientoRepository {
  get(): Promise<EstablecimientoResponse>;
  getById(id: string): Promise<EstablecimientoResponse>;
  search(request: string): Promise<EstablecimientoResponse>;
  insert(request: EstablecimientoRequest): Promise<EstablecimientoResponse>;
  update(request: EstablecimientoRequest): Promise<EstablecimientoResponse>;
  delete(id: string): Promise<EstablecimientoResponse>;
  checkData(): Promise<CheckDataResponse>;
}
