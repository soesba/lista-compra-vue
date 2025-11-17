import type ArticuloResponse from "@/services/articulo/models/ArticuloResponse"
import { xhr } from "../config/Repository"
import type ArticuloRepository from "./ArticuloRepository"
import { DtoToModel, requestModelToDto } from "./mapping/ArticuloMapping"
import type ArticuloDTO from "./dto/ArticuloDTO"
import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"
import ArticuloResponseDTO from './dto/ArticuloResponseDTO'
import ArticulosResponseDTO from './dto/ArticulosResponseDTO'
import ArticuloRequestDTO from './dto/ArticuloRequestDTO'
import CheckDataResponse from '../commons/CheckDataResponse'

export default class ArticuloRepositoryImpl implements ArticuloRepository {
  async get(): Promise<ArticuloResponse> {
    const endpoint = '/api/articulos'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ArticulosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: ArticuloDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<ArticuloResponse> {
    const endpoint = `/api/articulos/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ArticuloResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async search(request: string): Promise<ArticuloResponse> {
    const endpoint = `/api/articulos/search/${request}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ArticulosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: ArticuloDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: ArticuloRequest): Promise<ArticuloResponse> {
    const endpoint = `/api/articulos`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDto(request)
    const response = await xhr.post<ArticuloRequestDTO, ArticuloResponseDTO>(endpoint, requestDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async update(request: ArticuloRequest): Promise<ArticuloResponse> {
    const endpoint = `/api/articulos/${request.id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDto(request)
    const response = await xhr.put<ArticuloRequestDTO, ArticuloResponseDTO>(endpoint, requestDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<ArticuloResponse> {
    const endpoint = `/api/articulos/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.delete<ArticuloResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async checkData(): Promise<CheckDataResponse> {
    const endpoint = `/api/articulos/checkData`
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