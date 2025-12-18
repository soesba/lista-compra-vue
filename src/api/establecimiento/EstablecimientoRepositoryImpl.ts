import type EstablecimientoResponse from "@/services/establecimiento/models/EstablecimientoResponse"
import { xhr } from "../config/Repository"
import type EstablecimientoRepository from "./EstablecimientoRepository"
import { DtoToModel, requestModelToDto } from "./mapping/EstablecimientoMapping"
import type EstablecimientoDTO from "./dto/EstablecimientoDTO"
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest"
import EstablecimientoResponseDTO from './dto/EstablecimientoResponseDTO'
import EstablecimientosResponseDTO from './dto/EstablecimientosResponseDTO'
import EstablecimientoRequestDTO from './dto/EstablecimientoRequestDTO'
import CheckDataResponse from '@/services/commons/models/CheckDataResponse'
import OrderRequest from '@/services/commons/models/OrderRequest'
import Imagen from '@/services/commons/models/Imagen'
import ImagenDTO from '../commons/dto/ImagenDTO'

const mapping: { [key: string]: string } = {
  title: 'nombre'
}

export default class EstablecimientoRepositoryImpl implements EstablecimientoRepository {
  async get(orderReq: OrderRequest): Promise<EstablecimientoResponse> {
    const endpoint = '/api/establecimientos?' + new URLSearchParams({
      orderBy: mapping[orderReq.field] || orderReq.field,
      direction: orderReq.direction
    }).toString()
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<EstablecimientosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: EstablecimientoDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<EstablecimientoResponse> {
    const endpoint = `/api/establecimientos/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<EstablecimientoResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async getLogo(id: string): Promise<Imagen> {
    const endpoint = `/api/establecimientos/${id}/logo`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ImagenDTO>(endpoint, { headers })
    return response.data
  }

  async search(request: string, orderReq: OrderRequest): Promise<EstablecimientoResponse> {
    const endpoint = `/api/establecimientos/search/${request}?` + new URLSearchParams({
      orderBy: mapping[orderReq.field] || orderReq.field,
      direction: orderReq.direction
    }).toString()
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<EstablecimientosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: EstablecimientoDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: EstablecimientoRequest): Promise<EstablecimientoResponse> {
    const endpoint = `/api/establecimientos`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDto(request)
    const response = await xhr.post<EstablecimientoRequestDTO, EstablecimientoResponseDTO>(endpoint, requestDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async update(request: EstablecimientoRequest): Promise<EstablecimientoResponse> {
    const endpoint = `/api/establecimientos/${request.id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDto(request)
    const response = await xhr.put<EstablecimientoRequestDTO, EstablecimientoResponseDTO>(endpoint, requestDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<EstablecimientoResponse> {
    const endpoint = `/api/establecimientos/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.delete<EstablecimientoResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async checkData(): Promise<CheckDataResponse> {
    const endpoint = `/api/establecimientos/checkData`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<CheckDataResponse>(endpoint, { headers })
    return {
      respuesta: response.status,
      data: response.data.data
    }
  }
}
