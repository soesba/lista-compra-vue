import type Articulo from "@/services/articulo/models/Articulo"
import type ArticuloDTO from "../dto/ArticuloDTO"
import type ArticuloRequestDTO from "../dto/ArticuloRequestDTO"
import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"
import { dateToFront } from '@/utils/utils'

export const DtoToModel = (origin: ArticuloDTO): Articulo => {
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
		fechaCreacion: origin.fechaCreacion ? dateToFront(origin.fechaCreacion) : '',
		borrable: origin.borrable,
		tienePrecios: origin.tienePrecios,
    notas: origin.notas,
    precios: origin.precios ? origin.precios.map(item => {
      return {
        id: item.id,
        articulo: {
          id: item.articulo.id,
          nombre: item.articulo.nombre
        },
        precio: item.precio,
        marca: item.marca,
        fechaCompra: item.fechaCompra,
        fechaCreacion: item.fechaCreacion ? dateToFront(item.fechaCreacion) : '',
        notas: item.notas,
        borrable: item.borrable,
        establecimiento: item.establecimiento ? {
          id: item.establecimiento.id,
          nombre: item.establecimiento.nombre,
          logo: item.establecimiento.logo
        } : null,
        unidadesMedida: item.unidadesMedida ? item.unidadesMedida.map(um => {
          return {
            id: um.id,
            nombre: um.nombre,
            valor: um.valor
          }
        }) : []
      }
     }) : []
	}
	return model
}

export const requestModelToDto = (origin: ArticuloRequest): ArticuloRequestDTO => {
  const dto: ArticuloRequestDTO = {
    id: origin.id,
    nombre: origin.nombre,
    descripcion: origin.descripcion,
    tiposUnidad: origin.tiposUnidad ? origin.tiposUnidad.map(item => item.id) : [],
    borrable: origin.borrable,
    notas: origin.notas
  }
	return dto
}
