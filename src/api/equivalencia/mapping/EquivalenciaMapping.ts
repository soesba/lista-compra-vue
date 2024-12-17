import type Equivalencia from "@/services/equivalencia/models/Equivalencia"
import type EquivalenciaDTO from "../dto/EquivalenciaDTO"
import type EquivalenciaRequestDTO from "../dto/EquivalenciaRequestDTO"
import type EquivalenciaRequest from "@/services/equivalencia/models/EquivalenciaRequest"

export const DTOtoModel = (origin: EquivalenciaDTO): Equivalencia => {
	const model = {
		id: origin.id,
		from: origin.from,
		to: origin.to,
		factor: origin.factor,
		fechaCreacion: origin.fechaCreacion,
		borrable: origin.borrable
	}
	return model
}

export const requestDTOtoModel = (origin: EquivalenciaRequestDTO): EquivalenciaRequest => {
	return {...origin}
}

export const requestModelToDTO = (origin: EquivalenciaRequest): EquivalenciaRequestDTO => {
	return { ...origin }
}
