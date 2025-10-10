import type Equivalencia from "@/services/equivalencia/models/Equivalencia"
import type EquivalenciaDTO from "../dto/EquivalenciaDTO"
import type EquivalenciaRequestDTO from "../dto/EquivalenciaRequestDTO"
import type EquivalenciaRequest from "@/services/equivalencia/models/EquivalenciaRequest"

export const DtoToModel = (origin: EquivalenciaDTO): Equivalencia => {
	const model = {
		id: origin.id,
		from: origin.from,
		to: origin.to,
		factor: origin.factor,
		fechaCreacion: origin.fechaCreacion,
		borrable: origin.borrable,
    markedForDeletion: false
	}
	return model
}

export const ModelToDto = (origin: Equivalencia): EquivalenciaDTO => {
  const dto: EquivalenciaDTO = {
    ...origin
  }
  return dto
}

export const requestDtoToModel = (origin: EquivalenciaRequestDTO): EquivalenciaRequest => {
	return {...origin}
}

export const requestModelToDto = (origin: EquivalenciaRequest): EquivalenciaRequestDTO => {
	return { ...origin }
}
