import type Item from "@/services/desplegables/models/Item";

export default interface Equivalencia {
	id: string;
	tmpId?: number;
  from: Item;
	to: Item;
	factor: number;
  fechaCreacion: string;
  borrable: boolean;
  markedForDeletion?: boolean;
}
