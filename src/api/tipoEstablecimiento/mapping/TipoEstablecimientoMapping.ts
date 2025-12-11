import type TipoEstablecimiento from "@/services/tipoEstablecimiento/models/TipoEstablecimiento"
import type TipoEstablecimientoDTO from "../dto/TipoEstablecimientoDTO"
import type TipoEstablecimientoRequestDTO from "../dto/TipoEstablecimientoRequestDTO"
import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest"
import { dateToFront, StringToDate } from '@/utils/utils'

export const DtoToModel = (origin: TipoEstablecimientoDTO): TipoEstablecimiento => {
	return {
    ...origin,
    fechaCreacion: origin.fechaCreacion ? dateToFront(origin.fechaCreacion) : ''
  }
}

export const requestDtoToModel = (origin: TipoEstablecimientoRequestDTO): TipoEstablecimientoRequest => {
	return {
    ...origin,
    fechaCreacion: origin.fechaCreacion ? dateToFront(origin.fechaCreacion) : ''
  }
}

export const requestModelToDto = (origin: TipoEstablecimientoRequest): TipoEstablecimientoRequestDTO => {
	return {
    ...origin,
    fechaCreacion: origin.fechaCreacion ? StringToDate(origin.fechaCreacion) : new Date()
  }
}
