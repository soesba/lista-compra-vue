import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"

export default interface TipoUnidadRepository {
  get(): Promise<TipoUnidadResponse>;
}