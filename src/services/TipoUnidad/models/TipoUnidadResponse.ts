import type TipoUnidad from "./TipoUnidad"

export default interface TipoUnidadResponse {
  respuesta: string;
  data: TipoUnidad[];
}
