import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"
import { xhr } from "../config/Repository"
import type TipoUnidadRepository from "./TipoUnidadRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/TipoUnidadMapping"
import type TipoUnidadDTO from "./dto/TipoUnidadDTO"
import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest"

export default class TipoUnidadRepositoryImpl implements TipoUnidadRepository {
  async get (): Promise<TipoUnidadResponse> {
    const endpoint = '/tipoUnidad/get'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:TipoUnidadDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getByAny (request: string): Promise<TipoUnidadResponse> {
    const endpoint = `/tipoUnidad/getByAny/${request}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data.map((item:TipoUnidadDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }

  async insert(request: TipoUnidadRequest): Promise<TipoUnidadResponse> {
    const endpoint = `/tipoUnidad/insert/`
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

  async update(request: TipoUnidadRequest): Promise<TipoUnidadResponse> {
    console.log("LOG ~ TipoUnidadRepositoryImpl ~ update ~ request:", request)
    const endpoint = `/tipoUnidad/update`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = requestModelToDTO(request)
    const response = await xhr.put(endpoint, requestDTO, { headers})
    const result = {
      data: DTOtoModel(response.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<TipoUnidadResponse> {
    const endpoint = `/tipoUnidad/delete/${id}`
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