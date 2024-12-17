import type TipoUnidadDTO from "@/api/tipoUnidad/dto/TipoUnidadDTO";

export default interface ArticuloDTO {
	id: string;
	nombre: string;
	descripcion: string;
	tiposUnidad: TipoUnidadDTO[];
	fechaCreacion: string;
	tienePrecios: boolean;
	borrable: boolean;
}
