import type ArticuloResponse from "@/services/articulo/models/ArticuloResponse"
import { xhr } from "../config/Repository"
import type ArticuloRepository from "./ArticuloRepository"
import { DtoToModel, requestModelToDto } from "./mapping/ArticuloMapping"
import type ArticuloDTO from "./dto/ArticuloDTO"
import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"
import ArticuloResponseDTO from './dto/ArticuloResponseDTO'
import ArticulosResponseDTO from './dto/ArticulosResponseDTO'
import ArticuloRequestDTO from './dto/ArticuloRequestDTO'
import CheckDataResponse from '../commons/dto/CheckDataResponseDTO'
import OrderRequest from '@/services/commons/models/OrderRequest'

const mapping: { [key: string]: string } = {
  title: 'nombre'
}

export default class ArticuloRepositoryImpl implements ArticuloRepository {
	async get(orderReq: OrderRequest): Promise<ArticuloResponse> {
		const endpoint = '/api/articulos?' + new URLSearchParams({
      orderBy: mapping[orderReq.field] || orderReq.field,
      direction: orderReq.direction
    }).toString()
		const response = await xhr.get<ArticulosResponseDTO>(endpoint)
		const result = {
			data: response.data.data.map((item: ArticuloDTO) => DtoToModel(item)),
			respuesta: response.status
		}
		return result
	}

	async getById(id: string): Promise<ArticuloResponse> {
		const endpoint = `/api/articulos/${id}`
		const response = await xhr.get<ArticuloResponseDTO>(endpoint)
		const result = {
			data: DtoToModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async search(request: string, orderReq: OrderRequest): Promise<ArticuloResponse> {
		const endpoint = `/api/articulos/search/${request}?` + new URLSearchParams({
			orderBy: mapping[orderReq.field] || orderReq.field,
			direction: orderReq.direction
		}).toString()
		const response = await xhr.get<ArticulosResponseDTO>(endpoint)
		const result = {
			data: response.data.data.map((item: ArticuloDTO) => DtoToModel(item)),
			respuesta: response.status
		}
		return result
	}

	async insert(request: ArticuloRequest): Promise<ArticuloResponse> {
		const endpoint = `/api/articulos`
		const requestDTO = requestModelToDto(request)
		const response = await xhr.post<ArticuloRequestDTO, ArticuloResponseDTO>(endpoint, requestDTO)
		const result = {
			data: DtoToModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async update(request: ArticuloRequest): Promise<ArticuloResponse> {
		const endpoint = `/api/articulos/${request.id}`
		const requestDTO = requestModelToDto(request)
		const response = await xhr.put<ArticuloRequestDTO, ArticuloResponseDTO>(endpoint, requestDTO)
		const result = {
			data: DtoToModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async delete(id: string): Promise<ArticuloResponse> {
		const endpoint = `/api/articulos/${id}`
		const response = await xhr.delete<ArticuloResponseDTO>(endpoint)
		const result = {
			data: DtoToModel(response.data.data),
			respuesta: response.status
		}
		return result
	}

	async checkData(): Promise<CheckDataResponse> {
		const endpoint = `/api/articulos/checkData`
		const response = await xhr.get<CheckDataResponse>(endpoint)
		return {
			respuesta: response.status,
			data: response.data.data
		}
	}
}