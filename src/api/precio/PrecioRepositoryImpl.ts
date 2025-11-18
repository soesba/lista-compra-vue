import type PrecioResponse from "@/services/precio/models/PrecioResponse"
import { xhr } from "../config/Repository"
import type PrecioRepository from "./PrecioRepository"
import { DtoToModel, requestModelToDto } from "./mapping/PrecioMapping"
import type PrecioDTO from "./dto/PrecioDTO"
import type PrecioRequest from "@/services/precio/models/PrecioRequest"
import PreciosResponseDTO from './dto/PreciosResponseDTO'
import PrecioResponseDTO from './dto/PrecioResponseDTO'
import PrecioRequestDTO from './dto/PrecioRequestDTO'
import CheckDataResponse from '../commons/CheckDataResponse'

export default class PrecioRepositoryImpl implements PrecioRepository {
  async get(): Promise<PrecioResponse> {
    const endpoint = '/api/precios'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<PreciosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: PrecioDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<PrecioResponse> {
    const endpoint = `/api/precios/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<PrecioResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async getByArticuloId(id: string): Promise<PrecioResponse> {
    const endpoint = `/api/precios/articulo/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<PreciosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: PrecioDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async search(request: string): Promise<PrecioResponse> {
    const endpoint = `/api/precios/search/${request}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<PreciosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: PrecioDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: PrecioRequest): Promise<PrecioResponse> {
    const endpoint = `/api/precios/`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDto(request)
    const response = await xhr.post<PrecioRequestDTO, PrecioResponseDTO>(endpoint, requestDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async update(request: PrecioRequest): Promise<PrecioResponse> {
    const endpoint = `/api/precios/${request.id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDto(request)
    const response = await xhr.put<PrecioRequestDTO, PrecioResponseDTO>(endpoint, requestDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<PrecioResponse> {
    const endpoint = `/api/precios/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.delete<PrecioResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async checkData(): Promise<CheckDataResponse> {
    const endpoint = `/api/precios/checkData`
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
