import type Precio from "@/services/precio/models/Precio"
import type PrecioDTO from "../dto/PrecioDTO"
import type PrecioRequestDTO from "../dto/PrecioRequestDTO"
import type PrecioRequest from "@/services/precio/models/PrecioRequest"

export const DTOtoModel = (origin: PrecioDTO): Precio => {
  const model: Precio = { 
    id: origin.id,
    articulo: origin.articulo,
    precio: origin.precio,
    marca: origin.marca,
    establecimiento: origin.establecimiento,
    unidadesMedida: origin.unidadesMedida,
    // fechaCompra: origin.fechaCompra ? origin.fechaCompra.split('/').reverse().join('-') : origin.fechaCompra,
    fechaCompra: origin.fechaCompra ? new Date(origin.fechaCompra.split('/').reverse().join('-')) : null,
    fechaCreacion: origin.fechaCreacion,
    notas: origin.notas,
    borrable: origin.borrable
  }
  return model
}

export const requestModelToDTO = (origin: PrecioRequest): PrecioRequestDTO => {
  const dto: PrecioRequestDTO = { 
    id: origin.id,
    articulo: origin.articulo,
    precio: origin.precio,
    marca: origin.marca,
    establecimiento: origin.establecimiento,
    unidadesMedida: origin.unidadesMedida,
    fechaCompra: origin.fechaCompra ? new Intl.DateTimeFormat('es-ES', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(origin.fechaCompra) : '',
    fechaCreacion: origin.fechaCreacion,
    notas: origin.notas,
    borrable: origin.borrable
  }
  return dto
}
