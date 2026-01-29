import type TipoEstablecimientoResponse from "@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse"
import { xhr } from "../config/Repository"
import type TipoEstablecimientoRepository from "./TipoEstablecimientoRepository"
import { DtoToModel, requestModelToDto } from "./mapping/TipoEstablecimientoMapping"
import type TipoEstablecimientoDTO from "./dto/TipoEstablecimientoDTO"
import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest"
import TiposEstablecimientoResponseDTO from './dto/TiposEstablecimientoResponseDTO'
import TipoEstablecimientoResponseDTO from './dto/TipoEstablecimientoResponseDTO'
import TipoEstablecimientoRequestDTO from './dto/TipoEstablecimientoRequestDTO'
import CheckDataResponse from '@/services/commons/models/CheckDataResponse'
import OrderRequest from '@/services/commons/models/OrderRequest'

const mapping: { [key: string]: string } = {
  title: 'nombre'
}

export default class TipoEstablecimientoRepositoryImpl implements TipoEstablecimientoRepository {
  async get(orderReq: OrderRequest): Promise<TipoEstablecimientoResponse> {
    const endpoint = '/api/tipo-establecimientos?' + new URLSearchParams({
      orderBy: mapping[orderReq.field] || orderReq.field,
      direction: orderReq.direction
    }).toString()
    const response = await xhr.get<TiposEstablecimientoResponseDTO>(endpoint)
    const result = {
      data: response.data.data.map((item: TipoEstablecimientoDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<TipoEstablecimientoResponse> {
    const endpoint = `/api/tipo-establecimientos/${id}`
    const response = await xhr.get<TipoEstablecimientoResponseDTO>(endpoint)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async search(request: string, orderReq: OrderRequest): Promise<TipoEstablecimientoResponse> {
    const endpoint = `/api/tipo-establecimientos/search ${request}?` + new URLSearchParams({
      orderBy: mapping[orderReq.field] || orderReq.field,
      direction: orderReq.direction
    }).toString()
    const response = await xhr.get<TiposEstablecimientoResponseDTO>(endpoint)
    const result = {
      data: response.data.data.map((item: TipoEstablecimientoDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse> {
    const endpoint = `/api/tipo-establecimientos/`
    const requestDTO = requestModelToDto(request)
    const response = await xhr.post<TipoEstablecimientoRequestDTO, TipoEstablecimientoResponseDTO>(endpoint, requestDTO)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async update(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse> {
    const endpoint = `/api/tipo-establecimientos/${request.id}`
    const requestDTO = requestModelToDto(request)
    const response = await xhr.put<TipoEstablecimientoRequestDTO, TipoEstablecimientoResponseDTO>(endpoint, requestDTO)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<TipoEstablecimientoResponse> {
    const endpoint = `/api/tipo-establecimientos/${id}`
    const response = await xhr.delete<TipoEstablecimientoResponseDTO>(endpoint)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async checkData(): Promise<CheckDataResponse> {
    const endpoint = `/api/tipo-establecimientos/checkData`
    const response = await xhr.get<CheckDataResponse>(endpoint)
    return {
      respuesta: response.status,
      data: response.data.data
    }
  }
}
