import type ItemDTO from "@/api/desplegables/dto/ItemDTO"

export default interface EquivalenciaDTO {
	id: string;
	from: ItemDTO;
	to: ItemDTO;
	factor: number;
	fechaCreacion: string;
	borrable: boolean;
  markedForDeletion?: boolean;
}
