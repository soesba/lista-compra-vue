import PrecioDTO from '@/api/precio/dto/PrecioDTO';
import type TipoUnidadDTO from "@/api/tipoUnidad/dto/TipoUnidadDTO";

export default interface ArticuloDTO {
	id: string;
	nombre: string;
	descripcion: string;
	tiposUnidad: TipoUnidadDTO[];
	fechaCreacion: Date;
	tienePrecios: boolean;
	borrable: boolean;
  notas: string;
  precios?: Array<PrecioDTO>;
}
