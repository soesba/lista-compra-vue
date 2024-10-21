import type Equivalencia from "@/services/equivalencia/models/Equivalencia"

export default interface TipoUnidad {
  id: string;
  nombre: string;
  abreviatura: string;
  equivalencias: Equivalencia[];
  fechaCreacion: string;
  borrable: boolean;
}