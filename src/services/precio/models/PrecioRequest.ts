import type UnidadMedida from "./UnidadMedida";

export default interface PrecioRequest {
  id: string;
  articulo: {
    id: string;
    nombre: string;
  };
  precio: number | null;
  marca: string;
  establecimiento: string;
  unidadesMedida: Array<UnidadMedida>;
  fechaCompra: Date;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}