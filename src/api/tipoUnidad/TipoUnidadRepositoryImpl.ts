import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"
import { xhr } from "../config/Repository"
import type TipoUnidadRepository from "./TipoUnidadRepository"
import { DtoToModel, requestModelToDto } from "./mapping/TipoUnidadMapping"
import type TipoUnidadDTO from "./dto/TipoUnidadDTO"
import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest"
import TiposUnidadResponseDTO from './dto/TiposUnidadResponseDTO'
import TipoUnidadResponseDTO from './dto/TipoUnidadResponseDTO'
import TipoUnidadRequestDTO from './dto/TipoUnidadRequestDTO'
import CheckDataResponse from '@/services/commons/models/CheckDataResponse'
import EquivalenciaResponse from '@/services/equivalencia/models/EquivalenciaResponse'
import OrderRequest from '@/services/commons/models/OrderRequest'

const mapping: { [key: string]: string } = {
  title: 'nombre'
}

export default class TipoUnidadRepositoryImpl implements TipoUnidadRepository {
  async get(orderReq: OrderRequest): Promise<TipoUnidadResponse> {
    const endpoint = '/api/tipos-unidad?' + new URLSearchParams({
      orderBy: mapping[orderReq.field] || orderReq.field,
      direction: orderReq.direction
    }).toString()
    const response = await xhr.get<TiposUnidadResponseDTO>(endpoint)
    const result = {
      data: response.data.data.map((item: TipoUnidadDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<TipoUnidadResponse> {
    const endpoint = `/api/tipos-unidad/${id}`
    const response = await xhr.get<TipoUnidadResponseDTO>(endpoint)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async getEquivalencias(id: string): Promise<EquivalenciaResponse> {
    const endpoint = `/api/tipos-unidad/${id}/equivalencias`
    const response = await xhr.get<EquivalenciaResponse>(endpoint, { showMask: false })
    return {
      respuesta: response.status,
      data: response.data.data
    }
  }

  async search(request: string, orderReq: OrderRequest): Promise<TipoUnidadResponse> {
    const endpoint = `/api/tipos-unidad/search/${request}?` + new URLSearchParams({
      orderBy: mapping[orderReq.field] || orderReq.field,
      direction: orderReq.direction
    }).toString()
    const response = await xhr.get<TiposUnidadResponseDTO>(endpoint)
    const result = {
      data: response.data.data.map((item: TipoUnidadDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: TipoUnidadRequest): Promise<TipoUnidadResponse> {
    const endpoint = `/api/tipos-unidad/`
    const requestDTO = requestModelToDto(request)
    const response = await xhr.post<TipoUnidadRequestDTO, TipoUnidadResponseDTO>(endpoint, requestDTO)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async update(request: TipoUnidadRequest): Promise<TipoUnidadResponse> {
    const endpoint = `/api/tipos-unidad/${request.id}`
    const requestDTO = requestModelToDto(request)
    const response = await xhr.put<TipoUnidadRequestDTO, TipoUnidadResponseDTO>(endpoint, requestDTO)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<TipoUnidadResponse> {
    const endpoint = `/api/tipos-unidad/${id}`
    const response = await xhr.delete<TipoUnidadResponseDTO>(endpoint)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async checkData(): Promise<CheckDataResponse> {
    const endpoint = `/api/tipos-unidad/checkData`
    const response = await xhr.get<CheckDataResponse>(endpoint)
    return {
      respuesta: response.status,
      data: response.data.data
    }
  }
}
