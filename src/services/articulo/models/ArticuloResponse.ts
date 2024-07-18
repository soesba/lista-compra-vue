import type Articulo from "./Articulo"

export default interface ArticuloResponse {
  respuesta: number;
  data: Articulo | Articulo[];
}
