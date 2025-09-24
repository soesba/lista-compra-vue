import type EquivalenciaDTO from "./EquivalenciaDTO"

export default interface EquivalenciasResponseDTO {
	respuesta: number;
	data: EquivalenciaDTO[];
}
