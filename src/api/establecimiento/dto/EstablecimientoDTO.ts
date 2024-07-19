import type TipoEstablecimientoDTO from "@/api/tipoEstablecimiento/dto/TipoEstablecimientoDTO";
import type DireccionDTO from "./DireccionDTO"

export default interface EstablecimientoDTO {
  id: string;
  nombre: string;
  tipoEstablecimiento: TipoEstablecimientoDTO;
  notas: string;
  direcciones: DireccionDTO[];
  fechaCreacion: string;
  borrable: boolean;
}