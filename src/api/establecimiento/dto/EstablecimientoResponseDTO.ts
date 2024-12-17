import type EstablecimientoDTO from "./EstablecimientoDTO"

export default interface EstablecimientoResponseDTO {
	respuesta: number;
	data: EstablecimientoDTO | EstablecimientoDTO[];
}
