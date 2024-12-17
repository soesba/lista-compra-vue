import type Item from "@/services/desplegables/models/Item";

export default interface Equivalencia {
	id: string;
	tmpId?: string;
	to: Item;
	factor: number;
}
