import type TipoEstablecimiento from "@/services/tipoEstablecimiento/models/TipoEstablecimiento"
import type TipoEstablecimientoDTO from "../dto/TipoEstablecimientoDTO"
import type TipoEstablecimientoRequestDTO from "../dto/TipoEstablecimientoRequestDTO"
import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest"

export const DtoToModel = (origin: TipoEstablecimientoDTO): TipoEstablecimiento => {
	return {...origin}
}

export const requestDtoToModel = (origin: TipoEstablecimientoRequestDTO): TipoEstablecimientoRequest => {
	return {...origin}
}

export const requestModelToDto = (origin: TipoEstablecimientoRequest): TipoEstablecimientoRequestDTO => {
	return { ...origin }
}
