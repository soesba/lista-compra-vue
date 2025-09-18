import type TipoEstablecimientoResponse from "@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse"
import { xhr } from "../config/Repository"
import type TipoEstablecimientoRepository from "./TipoEstablecimientoRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/TipoEstablecimientoMapping"
import type TipoEstablecimientoDTO from "./dto/TipoEstablecimientoDTO"
import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest"

export default class TipoEstablecimientoRepositoryImpl implements TipoEstablecimientoRepository {
	async get (): Promise<TipoEstablecimientoResponse> {
		const endpoint = '/api/tipo-establecimientos'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:TipoEstablecimientoDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

  async getById (id: string): Promise<TipoEstablecimientoResponse> {
      const endpoint = `/api/tipo-establecimientos/${id}`
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

	async getByAny (request: string): Promise<TipoEstablecimientoResponse> {
		const endpoint = `/api/tipo-establecimientos/search/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:TipoEstablecimientoDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async insert(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse> {
		const endpoint = `/api/tipo-establecimientos/`
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

	async update(request: TipoEstablecimientoRequest): Promise<TipoEstablecimientoResponse> {
		const endpoint = `/api/tipo-establecimientos/${request.id}`
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

	async delete(id: string): Promise<TipoEstablecimientoResponse> {
		const endpoint = `/api/tipo-establecimientos/${id}`
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
