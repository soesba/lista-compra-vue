import type TipoUnidad from "@/services/tipoUnidad/models/TipoUnidad";
import type TipoUnidadDTO from "../dto/TipoUnidadDTO";
import type TipoUnidadRequestDTO from "../dto/TipoUnidadRequestDTO";
import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest";

export const DTOtoModel = (origin: TipoUnidadDTO): TipoUnidad => {
  return {...origin}
}

export const requestDTOtoModel = (origin: TipoUnidadRequestDTO): TipoUnidadRequest => {
  return {...origin}
}

export const requestModelToDTO = (origin: TipoUnidadRequest): TipoUnidadRequestDTO => {
  return { ...origin }
}
