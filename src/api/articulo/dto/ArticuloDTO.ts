import type PrecioDTO from "@/api/precio/dto/PrecioDTO";
import type TipoUnidadDTO from "@/api/tipoUnidad/dto/TipoUnidadDTO";

export default interface ArticuloDTO {
  id: string;
  nombre: string;
  descripcion: string;
  tiposUnidad: TipoUnidadDTO[];
  precios: PrecioDTO[];
  fechaCreacion: string;
  borrable: boolean;
}