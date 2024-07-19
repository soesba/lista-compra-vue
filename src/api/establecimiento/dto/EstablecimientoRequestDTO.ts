import type DireccionDTO from "./DireccionDTO";

export default interface EstablecimientoRequestDTO {
  id?: string;
  nombre: string;
  tipoEstablecimiento: string;
  notas: string;
  direcciones: DireccionDTO[];
  fechaCreacion: string;
  borrable: boolean;
}