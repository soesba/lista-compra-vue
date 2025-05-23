import type EquivalenciaRequest from "@/services/equivalencia/models/EquivalenciaRequest"
import type EquivalenciaResponse from "@/services/equivalencia/models/EquivalenciaResponse"

export default interface EquivalenciaRepository {
	get(): Promise<EquivalenciaResponse>;
	getById(id: string): Promise<EquivalenciaResponse>;
	getByFrom(id: string): Promise<EquivalenciaResponse>;
	getByFromMultiple(id: Array<string>): Promise<EquivalenciaResponse>;
	insert(request: EquivalenciaRequest): Promise<EquivalenciaResponse>;
	update(request: EquivalenciaRequest): Promise<EquivalenciaResponse>;
	delete(id: string): Promise<EquivalenciaResponse>;
}
