import type EstablecimientoResponse from "@/services/establecimiento/models/EstablecimientoResponse"
import { xhr } from "../config/Repository"
import type EstablecimientoRepository from "./EstablecimientoRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/EstablecimientoMapping"
import type EstablecimientoDTO from "./dto/EstablecimientoDTO"
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest"

export default class EstablecimientoRepositoryImpl implements EstablecimientoRepository {
  async get (): Promise<EstablecimientoResponse> {
    const endpoint = '/establecimiento/get'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:EstablecimientoDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getByAny (request: string): Promise<EstablecimientoResponse> {
    const endpoint = `/establecimiento/getByAny/${request}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:EstablecimientoDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: EstablecimientoRequest): Promise<EstablecimientoResponse> {
    const endpoint = `/establecimiento/insert/`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDTO(request)
    const response = await xhr.post(endpoint, requestDTO, { headers})
    const result = {
      data: DTOtoModel(response.data),
      respuesta: response.status
    }
    return result
  }

  async update(request: EstablecimientoRequest): Promise<EstablecimientoResponse> {
    const endpoint = `/establecimiento/update`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDTO(request)
    console.log("🚀 ~ EstablecimientoRepositoryImpl ~ update ~ requestDTO:", requestDTO)
    const response = await xhr.put(endpoint, requestDTO, { headers})
    console.log("🚀 ~ EstablecimientoRepositoryImpl ~ update ~ response:", response)
    const result = {
      data: DTOtoModel(response.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<EstablecimientoResponse> {
    const endpoint = `/establecimiento/delete/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.delete(endpoint, { headers})
    const result = {
      data: DTOtoModel(response.data),
      respuesta: response.status
    }
    return result
  }
}