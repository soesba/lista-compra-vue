import type Compra from "@/services/compra/models/Compra";
import type CompraDTO from "../dto/CompraDTO";
import type CompraRequestDTO from "../dto/CompraRequestDTO";
import type CompraRequest from "@/services/compra/models/CompraRequest";
import type Establecimiento from "@/services/establecimiento/models/Establecimiento";

export const DTOtoModel = (origin: CompraDTO): Compra => {
  const model: Compra = {
    id: origin.id,
    totalCompra: origin.totalCompra,
    articulos: origin.articulos,
    establecimiento: { ...origin.establecimiento},
    fechaCompra: origin.fechaCompra,
    fechaCreacion: origin.fechaCreacion,
    notas: origin.notas,
    borrable: origin.borrable
  }
  return model
}

export const requestDTOtoModel = (origin: CompraRequestDTO): CompraRequest => {
  return {...origin}
}

export const requestModelToDTO = (origin: CompraRequest): CompraRequestDTO => {
  return { ...origin }
}
