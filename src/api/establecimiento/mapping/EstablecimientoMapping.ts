import type Establecimiento from "@/services/establecimiento/models/Establecimiento"
import type EstablecimientoDTO from "../dto/EstablecimientoDTO"
import type EstablecimientoRequestDTO from "../dto/EstablecimientoRequestDTO"
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest"
import { dateToFront, StringToDate } from '@/utils/utils'
import DireccionDTO from '../dto/DireccionDTO'


const direccionModelToDto = (origin: any): DireccionDTO => {
  return {
    id: origin.id,
    direccion: origin.direccion,
    codPostal: origin.codPostal,
    poblacion: origin.poblacion,
    favorita: origin.favorita
  }
}

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
    fechaCreacion: origin.fechaCreacion ? StringToDate(origin.fechaCreacion) : new Date(),
    tipoEstablecimiento: origin.tipoEstablecimiento.id,
    direcciones: origin.direcciones.map(direccion => direccionModelToDto(direccion)) || []
  }

	return dto
}
