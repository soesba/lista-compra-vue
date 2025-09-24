import type TipoEstablecimientoResponse from "@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse"
import { xhr } from "../config/Repository"
import type TipoEstablecimientoRepository from "./TipoEstablecimientoRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/TipoEstablecimientoMapping"
import type TipoEstablecimientoDTO from "./dto/TipoEstablecimientoDTO"
import type TipoEstablecimientoRequest from "@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest"
import TiposEstablecimientoResponseDTO from './dto/TiposEstablecimientoResponseDTO'
import TipoEstablecimientoResponseDTO from './dto/TipoEstablecimientoResponseDTO'
import TipoEstablecimientoRequestDTO from './dto/TipoEstablecimientoRequestDTO'

export default class TipoEstablecimientoRepositoryImpl implements TipoEstablecimientoRepository {
	async get (): Promise<TipoEstablecimientoResponse> {
		const endpoint = '/api/tipo-establecimientos'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<TiposEstablecimientoResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data.map((item:TipoEstablecimientoDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

  async getById (id: string): Promise<TipoEstablecimientoResponse> {
      const endpoint = `/api/tipo-establecimientos/${id}`
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      const response = await xhr.get<TipoEstablecimientoResponseDTO>(endpoint, { headers})
      const result = {
        data: DTOtoModel(response.data.data),
        respuesta: response.status
      }
      return result
    }

	async search (request: string): Promise<TipoEstablecimientoResponse> {
		const endpoint = `/api/tipo-establecimientos/search/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<TiposEstablecimientoResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data.map((item:TipoEstablecimientoDTO) => DTOtoModel(item)),
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
		const response = await xhr.post<TipoEstablecimientoRequestDTO, TipoEstablecimientoResponseDTO>(endpoint, requestDTO, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
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
		const response = await xhr.put<TipoEstablecimientoRequestDTO, TipoEstablecimientoResponseDTO>(endpoint, requestDTO, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async delete(id: string): Promise<TipoEstablecimientoResponse> {
		const endpoint = `/api/tipo-establecimientos/${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.delete<TipoEstablecimientoResponseDTO>(endpoint, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}
}
