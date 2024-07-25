import type Compra from "./Compra"

export default interface CompraResponse {
  respuesta: number;
  data: Compra | Compra[];
}
