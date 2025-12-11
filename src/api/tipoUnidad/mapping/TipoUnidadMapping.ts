import type TipoUnidad from "@/services/tipoUnidad/models/TipoUnidad";
import type TipoUnidadDTO from "../dto/TipoUnidadDTO";
import type TipoUnidadRequestDTO from "../dto/TipoUnidadRequestDTO";
import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest";
import { dateToFront, StringToDate } from '@/utils/utils';

export const DtoToModel = (origin: TipoUnidadDTO): TipoUnidad => {
	return {
      ...origin,
      fechaCreacion: origin.fechaCreacion ? dateToFront(origin.fechaCreacion) : ''
    }
}

export const requestDtoToModel = (origin: TipoUnidadRequestDTO): TipoUnidadRequest => {
	return {
      ...origin,
      fechaCreacion: origin.fechaCreacion ? dateToFront(origin.fechaCreacion) : ''
    }
}

export const requestModelToDto = (origin: TipoUnidadRequest): TipoUnidadRequestDTO => {
	return {
      ...origin,
      fechaCreacion: origin.fechaCreacion ? StringToDate(origin.fechaCreacion) : new Date()
    }
}
