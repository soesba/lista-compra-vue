import type EstablecimientoResponse from "@/services/establecimiento/models/EstablecimientoResponse"
import { xhr } from "../config/Repository"
import type EstablecimientoRepository from "./EstablecimientoRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/EstablecimientoMapping"
import type EstablecimientoDTO from "./dto/EstablecimientoDTO"
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest"

export default class EstablecimientoRepositoryImpl implements EstablecimientoRepository {
	async get (): Promise<EstablecimientoResponse> {
		const endpoint = '/api/establecimientos'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:EstablecimientoDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async getById (id: string): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos/${id}`
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


	async search (request: string): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos/search/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:EstablecimientoDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async insert(request: EstablecimientoRequest): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos`
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

	async update(request: EstablecimientoRequest): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos/${request.id}`
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

	async delete(id: string): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos/${id}`
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
