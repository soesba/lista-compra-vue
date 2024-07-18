import type Articulo from "@/services/articulo/models/Articulo";
import type ArticuloDTO from "../dto/ArticuloDTO";
import type ArticuloRequestDTO from "../dto/ArticuloRequestDTO";
import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest";

export const DTOtoModel = (origin: ArticuloDTO): Articulo => {
  return {...origin}
}

export const requestDTOtoModel = (origin: ArticuloRequestDTO): ArticuloRequest => {
  return {...origin}
}

export const requestModelToDTO = (origin: ArticuloRequest): ArticuloRequestDTO => {
  return { ...origin }
}
