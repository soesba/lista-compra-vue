import type TipoUnidadDTO from "./TipoUnidadDTO"

export default interface TipoUnidadResponseDTO {
  respuesta: number;
  data: TipoUnidadDTO[];
}
