import type TipoEstablecimiento from "./TipoEstablecimiento";

export default interface TipoEstablecimientoResponseO {
	respuesta: number;
	data: TipoEstablecimiento | TipoEstablecimiento[];
}
