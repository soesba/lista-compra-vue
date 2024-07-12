import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"
import { xhr } from "../config/Repository"
import type TipoUnidadRepository from "./TipoUnidadRepository"
import { DTOtoModel } from "./mapping/TipoUnidadMapping"
import type TipoUnidadDTO from "./dto/TipoUnidadDTO"

export default class TipoUnidadRepositoryImpl implements TipoUnidadRepository {
  async get (): Promise<TipoUnidadResponse> {
    const endpoint = '/tipoUnidades'
    console.log("🚀 ~ TipoUnidadRepositoryImpl ~ get ~ endpoint:", endpoint)
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    console.log("🚀 ~ TipoUnidadRepositoryImpl ~ get ~ response:", response)
    const result = {
      data: response.data.map((item:TipoUnidadDTO) => DTOtoModel(item)),
      respuesta: response.status
    }
    return result
  }
}