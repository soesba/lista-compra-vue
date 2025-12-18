import Imagen from '@/services/commons/models/Imagen';
import type UnidadMedida from "./UnidadMedida";

export default interface Precio {
  id: string;
  articulo: {
    id: string;
    nombre: string;
  };
  precio: number;
  marca: string;
  establecimiento: {
    id: string;
    nombre: string;
    logo?: Imagen;
  } | null;
  unidadesMedida: Array<UnidadMedida>;
  fechaCompra: Date | null;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}
