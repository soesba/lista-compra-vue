import type ArticuloDTO from "./ArticuloDTO"

export default interface ArticulosResponseDTO {
  respuesta: number;
  data: ArticuloDTO[];
}
