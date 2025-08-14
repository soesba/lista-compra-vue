import type Item from "@/services/desplegables/models/Item";

export default interface Equivalencia {
	id: string;
	tmpId?: string;
  from: Item;
	to: Item;
	factor: number;
  fechaCreacion: string;
  borrable: boolean;
}
