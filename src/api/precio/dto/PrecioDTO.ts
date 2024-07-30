import type EstablecimientoDTO from "@/api/establecimiento/dto/EstablecimientoDTO"
import type UnidadMedidaDTO from "./UnidadMedidaDTO";
import type Articulo from "@/services/articulo/models/Articulo";
import type ArticuloDTO from "@/api/articulo/dto/ArticuloDTO";

export default interface PrecioDTO {
  id: string;
  articulo: ArticuloDTO;
  precio: number | null;
  marca: string;
  establecimiento: EstablecimientoDTO;
  unidadesMedida: Array<UnidadMedidaDTO>;
  fechaCompra: string;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}