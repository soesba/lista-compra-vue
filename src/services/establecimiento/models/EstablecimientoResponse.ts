import type Establecimiento from "./Establecimiento";

export default interface EstablecimientoResponse {
  respuesta: number;
  data: Establecimiento | Establecimiento[];
}