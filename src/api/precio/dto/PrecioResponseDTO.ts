import type PrecioDTO from "./PrecioDTO"

export default interface PrecioResponseDTO {
	respuesta: number;
	data: PrecioDTO;
}
