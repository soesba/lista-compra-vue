import type Equivalencia from "./Equivalencia"

export default interface EquivalenciaResponse {
	respuesta: number;
	data: Equivalencia | Equivalencia[];
}
