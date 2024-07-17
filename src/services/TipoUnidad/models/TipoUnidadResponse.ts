import type TipoUnidad from "./TipoUnidad"

export default interface TipoUnidadResponse {
  respuesta: number;
  data: TipoUnidad | TipoUnidad[];
}
