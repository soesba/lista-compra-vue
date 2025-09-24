import type EstablecimientoDTO from "./EstablecimientoDTO"

export default interface EstablecimientosResponseDTO {
	respuesta: number;
	data: EstablecimientoDTO[];
}
