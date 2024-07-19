import type Direccion from "./Direccion";

export default interface Establecimiento {
  id: string;
  nombre: string;
  tipoEstablecimiento: {
    id: string;
    nombre: string;
  };
  notas: string;
  direcciones: Direccion[];
  fechaCreacion: string;
  borrable: boolean;
}