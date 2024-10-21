import type EquivalenciaDTO from "./EquivalenciaDTO"

export default interface EquivalenciaResponseDTO {
  respuesta: number;
  data: EquivalenciaDTO | EquivalenciaDTO[];
}
