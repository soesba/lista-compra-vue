import type PrecioDTO from "./PrecioDTO"

export default interface PreciosResponseDTO {
	respuesta: number;
	data: PrecioDTO[];
}
