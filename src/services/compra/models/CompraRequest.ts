import type Establecimiento from "@/services/establecimiento/models/Establecimiento";

export default interface CompraRequest {
  id: string;
  totalCompra: number;
  articulos: Array<any>;
  establecimiento: {
    id: string;
    nombre: string;
  };
  fechaCompra: string;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}