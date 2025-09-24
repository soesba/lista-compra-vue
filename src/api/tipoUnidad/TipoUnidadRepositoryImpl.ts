import type TipoUnidadResponse from "@/services/tipoUnidad/models/TipoUnidadResponse"
import { xhr } from "../config/Repository"
import type TipoUnidadRepository from "./TipoUnidadRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/TipoUnidadMapping"
import type TipoUnidadDTO from "./dto/TipoUnidadDTO"
import type TipoUnidadRequest from "@/services/tipoUnidad/models/TipoUnidadRequest"
import TiposUnidadResponseDTO from './dto/TiposUnidadResponseDTO'
import TipoUnidadResponseDTO from './dto/TipoUnidadResponseDTO'
import TipoUnidadRequestDTO from './dto/TipoUnidadRequestDTO'

export default class TipoUnidadRepositoryImpl implements TipoUnidadRepository {
	async get (): Promise<TipoUnidadResponse> {
		const endpoint = '/api/tipos-unidad'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<TiposUnidadResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data.map((item:TipoUnidadDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async getById (id: string): Promise<TipoUnidadResponse> {
		const endpoint = `/api/tipos-unidad/${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<TipoUnidadResponseDTO>(endpoint, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async search (id: string): Promise<TipoUnidadResponse> {
		const endpoint = `/api/tipos-unidad/search/${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<TiposUnidadResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data.map((item:TipoUnidadDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async insert(request: TipoUnidadRequest): Promise<TipoUnidadResponse> {
		const endpoint = `/api/tipos-unidad/`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const requestDTO = requestModelToDTO(request)
		const response = await xhr.post<TipoUnidadRequestDTO, TipoUnidadResponseDTO>(endpoint, requestDTO, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async update(request: TipoUnidadRequest): Promise<TipoUnidadResponse> {
		const endpoint = `/api/tipos-unidad/${request.id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const requestDTO = requestModelToDTO(request)
		const response = await xhr.put<TipoUnidadRequestDTO, TipoUnidadResponseDTO>(endpoint, requestDTO, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async delete(id: string): Promise<TipoUnidadResponse> {
		const endpoint = `/api/tipos-unidad/${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.delete<TipoUnidadResponseDTO>(endpoint, { headers})
		const result = {
			data: DTOtoModel(response.data.data),
			respuesta: response.status
		}
		return result
	}
}
