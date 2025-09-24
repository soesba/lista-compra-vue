import type EstablecimientoResponse from "@/services/establecimiento/models/EstablecimientoResponse"
import { xhr } from "../config/Repository"
import type EstablecimientoRepository from "./EstablecimientoRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/EstablecimientoMapping"
import type EstablecimientoDTO from "./dto/EstablecimientoDTO"
import type EstablecimientoRequest from "@/services/establecimiento/models/EstablecimientoRequest"
import EstablecimientoResponseDTO from './dto/EstablecimientoResponseDTO'
import Establecimiento from '@/services/establecimiento/models/Establecimiento'
import EstablecimientosResponseDTO from './dto/EstablecimientosResponseDTO'
import EstablecimientoRequestDTO from './dto/EstablecimientoRequestDTO'

export default class EstablecimientoRepositoryImpl implements EstablecimientoRepository {
	async get (): Promise<EstablecimientoResponse> {
		const endpoint = '/api/establecimientos'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<EstablecimientosResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data.map((item:EstablecimientoDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async getById (id: string): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos/${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<EstablecimientoResponseDTO>(endpoint, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}


	async search (request: string): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos/search/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<EstablecimientosResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data.map((item:EstablecimientoDTO) => DTOtoModel(item)),
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
		const response = await xhr.post<EstablecimientoRequestDTO, EstablecimientoResponseDTO>(endpoint, requestDTO, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
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
		const response = await xhr.put<EstablecimientoRequestDTO, EstablecimientoResponseDTO>(endpoint, requestDTO, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async delete(id: string): Promise<EstablecimientoResponse> {
		const endpoint = `/api/establecimientos/${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.delete<EstablecimientoResponseDTO>(endpoint, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}
}
