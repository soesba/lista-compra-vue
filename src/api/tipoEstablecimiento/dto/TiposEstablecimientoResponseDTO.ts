import type TipoEstablecimientoDTO from "./TipoEstablecimientoDTO"

export default interface TiposEstablecimientoResponseDTO {
	respuesta: number;
	data: TipoEstablecimientoDTO[];
}
