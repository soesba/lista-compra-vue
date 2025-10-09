import type Articulo from "@/services/articulo/models/Articulo"
import type ArticuloDTO from "../dto/ArticuloDTO"
import type ArticuloRequestDTO from "../dto/ArticuloRequestDTO"
import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"

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
		fechaCreacion: origin.fechaCreacion,
		borrable: origin.borrable,
		tienePrecios: origin.tienePrecios
	}
	return model
}

export const requestModelToDTO = (origin: ArticuloRequest): ArticuloRequestDTO => {
  const dto: ArticuloRequestDTO = {
    id: origin.id,
    nombre: origin.nombre,
    descripcion: origin.descripcion,
    tiposUnidad: origin.tiposUnidad ? origin.tiposUnidad.map(item => item.id) : [],
    borrable: origin.borrable
  }
	return dto
}
