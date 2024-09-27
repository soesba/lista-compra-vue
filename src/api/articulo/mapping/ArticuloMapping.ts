import type Articulo from "@/services/articulo/models/Articulo";
import type ArticuloDTO from "../dto/ArticuloDTO";
import type ArticuloRequestDTO from "../dto/ArticuloRequestDTO";
import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest";
import { DTOtoModel as precioDTOToModel } from "@/api/precio/mapping/PrecioMapping";

export const DTOtoModel = (origin: ArticuloDTO): Articulo => {
  const model = {
    id: origin.id,
    nombre: origin.nombre,
    descripcion: origin.descripcion,
    tiposUnidad: origin.tiposUnidad ? origin.tiposUnidad.map(item => {
      return {
        id: item.id,
        nombre: item.nombre
      }
    }) : [],
    precios: origin.precios.map(item => precioDTOToModel(item)),
    fechaCreacion: origin.fechaCreacion,
    borrable: origin.borrable

  }
  return model
}

export const requestDTOtoModel = (origin: ArticuloRequestDTO): ArticuloRequest => {
  return {...origin}
}

export const requestModelToDTO = (origin: ArticuloRequest): ArticuloRequestDTO => {
  return { ...origin }
}
