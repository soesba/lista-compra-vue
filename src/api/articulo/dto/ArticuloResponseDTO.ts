import type ArticuloDTO from "./ArticuloDTO"

export default interface ArticuloResponseDTO {
  respuesta: number;
  data: ArticuloDTO[];
}
