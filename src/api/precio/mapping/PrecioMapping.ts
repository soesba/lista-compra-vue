import type Precio from "@/services/precio/models/Precio"
import type PrecioDTO from "../dto/PrecioDTO"
import type PrecioRequestDTO from "../dto/PrecioRequestDTO"
import type PrecioRequest from "@/services/precio/models/PrecioRequest"
import { dateToFront, StringToDate, stringToNumber } from '@/utils/utils'

export const DtoToModel = (origin: PrecioDTO): Precio => {
	const model: Precio = {
		id: origin.id,
		articulo: origin.articulo,
		precio: origin.precio,
		marca: origin.marca,
		establecimiento: origin.establecimiento,
		unidadesMedida: origin.unidadesMedida,
		fechaCompra: origin.fechaCompra,
		fechaCreacion: origin.fechaCreacion ? dateToFront(origin.fechaCreacion) : '',
		notas: origin.notas,
		borrable: origin.borrable
	}
	return model
}

export const requestModelToDto = (origin: PrecioRequest): PrecioRequestDTO => {
	const dto: PrecioRequestDTO = {
		id: origin.id,
		articulo: origin.articulo.id,
		precio: stringToNumber(origin.precio!.toString()),
		marca: origin.marca,
		establecimiento: origin.establecimiento,
		unidadesMedida: origin.unidadesMedida,
		fechaCompra: origin.fechaCompra,
		fechaCreacion: origin.fechaCreacion ? StringToDate(origin.fechaCreacion) : new Date(),
		notas: origin.notas,
		borrable: origin.borrable
	}
	return dto
}
