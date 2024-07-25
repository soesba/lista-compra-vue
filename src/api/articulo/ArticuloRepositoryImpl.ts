import type ArticuloResponse from "@/services/articulo/models/ArticuloResponse"
import { xhr } from "../config/Repository"
import type ArticuloRepository from "./ArticuloRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/ArticuloMapping"
import type ArticuloDTO from "./dto/ArticuloDTO"
import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"

export default class ArticuloRepositoryImpl implements ArticuloRepository {
  async get (): Promise<ArticuloResponse> {
    const endpoint = '/articulo/get'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:ArticuloDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById (id: string): Promise<ArticuloResponse> {
    const endpoint = `/articulo/getById/${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: DTOtoModel(response.data),
      respuesta: response.status
    }
    return result
  }

  async getByAny (request: string): Promise<ArticuloResponse> {
    const endpoint = `/articulo/getByAny/${request}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:ArticuloDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: ArticuloRequest): Promise<ArticuloResponse> {
    const endpoint = `/articulo/insert/`
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

  async update(request: ArticuloRequest): Promise<ArticuloResponse> {
    const endpoint = `/articulo/update`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDTO(request)
    console.log("🚀 ~ ArticuloRepositoryImpl ~ update ~ requestDTO:", requestDTO)
    const response = await xhr.put(endpoint, requestDTO, { headers})
    console.log("🚀 ~ ArticuloRepositoryImpl ~ update ~ response:", response)
    const result = {
      data: DTOtoModel(response.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<ArticuloResponse> {
    const endpoint = `/articulo/delete/${id}`
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