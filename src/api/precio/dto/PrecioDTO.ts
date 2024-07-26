import type EstablecimientoDTO from "@/api/establecimiento/dto/EstablecimientoDTO"
import type UnidadMedidaDTO from "./UnidadMedidaDTO";
import type Articulo from "@/services/articulo/models/Articulo";

export default interface PrecioDTO {
  id: string;
  articulo: string;
  precio: number | null;
  marca: string;
  establecimiento: EstablecimientoDTO;
  unidadesMedida: Array<UnidadMedidaDTO>;
  fechaCompra: string;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}