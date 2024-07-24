import type Direccion from "./Direccion";

export default interface Establecimiento {
  id: string;
  tmpId?: string;
  nombre: string;
  tipoEstablecimiento: {
    id: string;
    nombre: string;
  };
  logo: {
    type: string,
    content: string
  };
  notas: string;
  direcciones: Direccion[];
  fechaCreacion: string;
  borrable: boolean;
}