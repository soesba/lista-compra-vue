import type TipoUnidadDTO from "./TipoUnidadDTO"

export default interface TipoUnidadResponseDTO {
  respuesta: string;
  data: TipoUnidadDTO[];
}
