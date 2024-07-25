import type CompraResponse from "@/services/compra/models/CompraResponse"
import { xhr } from "../config/Repository"
import type CompraRepository from "./CompraRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/CompraMapping"
import type CompraDTO from "./dto/CompraDTO"
import type CompraRequest from "@/services/compra/models/CompraRequest"

export default class CompraRepositoryImpl implements CompraRepository {
  async get (): Promise<CompraResponse> {
    const endpoint = '/compra/get'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:CompraDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById (id: string): Promise<CompraResponse> {
    const endpoint = `/compra/getById/${id}`
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

  async getByAny (request: string): Promise<CompraResponse> {
    const endpoint = `/compra/getByAny/${request}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:CompraDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: CompraRequest): Promise<CompraResponse> {
    const endpoint = `/compra/insert/`
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

  async update(request: CompraRequest): Promise<CompraResponse> {
    const endpoint = `/compra/update`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDTO(request)
    console.log("🚀 ~ CompraRepositoryImpl ~ update ~ requestDTO:", requestDTO)
    const response = await xhr.put(endpoint, requestDTO, { headers})
    console.log("🚀 ~ CompraRepositoryImpl ~ update ~ response:", response)
    const result = {
      data: DTOtoModel(response.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<CompraResponse> {
    const endpoint = `/compra/delete/${id}`
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