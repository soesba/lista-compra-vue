import type ItemDTO from "./ItemDTO"

export default interface ItemResponseDTO {
	respuesta: number;
	data: ItemDTO[];
}
