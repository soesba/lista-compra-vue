import type TipoUnidad from "@/services/tipoUnidad/models/TipoUnidad";
import type UnidadMedida from "./UnidadMedida";

export default interface Precio {
  id: string;
  articulo:   {
    id: string;
    nombre: string;
  } | null;
  precio: number | null;
  marca: string;
  establecimiento: {
    id: string;
    nombre: string;
  } | null;
  unidadesMedida: Array<UnidadMedida>;
  fechaCompra: Date | null;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}