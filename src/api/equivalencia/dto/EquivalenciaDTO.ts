import type ItemDTO from "@/api/desplegables/dto/ItemDTO"

export default interface EquivalenciaDTO {
	id: string;
	to: ItemDTO;
	factor: number;
}
