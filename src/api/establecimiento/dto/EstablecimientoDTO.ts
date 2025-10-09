import type TipoEstablecimientoDTO from "@/api/tipoEstablecimiento/dto/TipoEstablecimientoDTO";
import type DireccionDTO from "./DireccionDTO"
import ImagenDTO from '@/api/commons/ImagenDTO';

export default interface EstablecimientoDTO {
	id: string;
	nombre: string;
	tipoEstablecimiento: TipoEstablecimientoDTO;
	logo: ImagenDTO;
	notas: string;
	direcciones: DireccionDTO[];
	fechaCreacion: string;
	borrable: boolean;
}
