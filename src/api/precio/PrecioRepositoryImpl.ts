import type PrecioResponse from "@/services/precio/models/PrecioResponse"
import { xhr } from "../config/Repository"
import type PrecioRepository from "./PrecioRepository"
import { DTOtoModel, requestModelToDTO } from "./mapping/PrecioMapping"
import type PrecioDTO from "./dto/PrecioDTO"
import type PrecioRequest from "@/services/precio/models/PrecioRequest"

export default class PrecioRepositoryImpl implements PrecioRepository {
	async get (): Promise<PrecioResponse> {
		const endpoint = '/api/precios'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:PrecioDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async getById (id: string): Promise<PrecioResponse> {
		const endpoint = `/api/precios/${id}`
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

	async getByArticuloId (id: string): Promise<PrecioResponse> {
		const endpoint = `/api/precios/articulo/${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:PrecioDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async search (request: string): Promise<PrecioResponse> {
		const endpoint = `/api/precios/search/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:PrecioDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async insert(request: PrecioRequest): Promise<PrecioResponse> {
		const endpoint = `/api/precios/`
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

	async update(request: PrecioRequest): Promise<PrecioResponse> {
		const endpoint = `/api/precios/${request.id}`
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

	async delete(id: string): Promise<PrecioResponse> {
		const endpoint = `/api/precios/${id}`
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
