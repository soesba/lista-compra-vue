import type ItemResponse from "@/services/desplegables/models/ItemResponse"

export default interface DesplegableRepository {
	get(tipoDato: string): Promise<ItemResponse>;
}
