import type Establecimiento from "@/services/establecimiento/models/Establecimiento"
import type EstablecimientoDTO from "../dto/EstablecimientoDTO"
import type EstablecimientoRequestDTO from "../dto/EstablecimientoRequestDTO"
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest"

export const DTOtoModel = (origin: EstablecimientoDTO): Establecimiento => {
  const model = {
    id: origin.id,
    nombre: origin.nombre,
    tipoEstablecimiento: {
      id: origin.tipoEstablecimiento.id,
      nombre: origin.tipoEstablecimiento.nombre
    },
    notas: origin.notas,
    direcciones: origin.direcciones,
    fechaCreacion: origin.fechaCreacion,
    borrable: origin.borrable
  }
  return model
}

export const requestDTOtoModel = (origin: EstablecimientoRequestDTO): EstablecimientoRequest => {
  return {...origin}
}

export const requestModelToDTO = (origin: EstablecimientoRequest): EstablecimientoRequestDTO => {
  return { ...origin }
}
