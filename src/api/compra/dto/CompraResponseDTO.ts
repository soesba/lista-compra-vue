import type CompraDTO from "./CompraDTO"

export default interface CompraResponseDTO {
  respuesta: number;
  data: CompraDTO | CompraDTO[];
}
