import type Establecimiento from "@/services/establecimiento/models/Establecimiento"
import type EstablecimientoDTO from "../dto/EstablecimientoDTO"
import type EstablecimientoRequestDTO from "../dto/EstablecimientoRequestDTO"
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest"
import { dateToFront } from '@/utils/utils'

export const DtoToModel = (origin: EstablecimientoDTO): Establecimiento => {
	const model = {
		id: origin.id,
		nombre: origin.nombre,
		tipoEstablecimiento: {
			id: origin.tipoEstablecimiento.id,
			nombre: origin.tipoEstablecimiento.nombre
		},
    tipoEstablecimientoId: origin.tipoEstablecimiento.id,
		tipoEstablecimientoNombre: origin.tipoEstablecimiento.nombre,
		notas: origin.notas,
		logo: origin.logo,
		direcciones: origin.direcciones || [],
		fechaCreacion: origin.fechaCreacion ? dateToFront(origin.fechaCreacion) : '',
		borrable: origin.borrable
	}
	return model
}

export const requestModelToDto = (origin: EstablecimientoRequest): EstablecimientoRequestDTO => {
  const dto: EstablecimientoRequestDTO = {
    ...origin,
    fechaCreacion: origin.fechaCreacion ? new Date(origin.fechaCreacion) : new Date(),
    tipoEstablecimiento: origin.tipoEstablecimiento.id
  }

	return dto
}
