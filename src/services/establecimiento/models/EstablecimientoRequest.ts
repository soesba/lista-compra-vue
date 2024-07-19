import type Direccion from "./Direccion";

export default interface TipoEstablecimientoRequest {
  id?: string;
  nombre: string;
  tipoEstablecimiento: string;
  notas: string;
  direcciones: Direccion[];
  fechaCreacion: string;
  borrable: boolean;
}