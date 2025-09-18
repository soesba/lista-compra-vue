import type EquivalenciaResponse from "@/services/equivalencia/models/EquivalenciaResponse"
import { xhr } from "../config/Repository"
import type EquivalenciaRepository from "./EquivalenciaRepository"
import { DTOtoModel, modelToDTO, requestModelToDTO } from "./mapping/EquivalenciaMapping"
import type EquivalenciaDTO from "./dto/EquivalenciaDTO"
import type EquivalenciaRequest from "@/services/equivalencia/models/EquivalenciaRequest"
import Equivalencia from '@/services/equivalencia/models/Equivalencia'

export default class EquivalenciaRepositoryImpl implements EquivalenciaRepository {
	async get (): Promise<EquivalenciaResponse> {
		const endpoint = '/api/tipos-unidad-equivalencia'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:EquivalenciaDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async getById (id: string): Promise<EquivalenciaResponse> {
		const endpoint = `/api/tipos-unidad-equivalencia/${id}`
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

	async getByFrom (request: string): Promise<EquivalenciaResponse> {
		const endpoint = `/api/tipos-unidad-equivalencia/from/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:EquivalenciaDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async getByFromMultiple (request: Array<string>): Promise<EquivalenciaResponse> {
		const endpoint = `/api/tipos-unidad-equivalencia/from-multiple/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:EquivalenciaDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

	async search (request: string): Promise<EquivalenciaResponse> {
		const endpoint = `/api/tipos-unidad-equivalencia/search/${request}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get(endpoint, { headers})
		const result = {
			data: response.data.map((item:EquivalenciaDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
	}

  async save(request: Equivalencia[]): Promise<EquivalenciaResponse> {
    const endpoint = `/api/tipos-unidad-equivalencia/save/`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const requestDTO = request.map((item: Equivalencia) => modelToDTO(item))
		const response = await xhr.post(endpoint, requestDTO, { headers})
		const result = {
			data: DTOtoModel(response.data),
			respuesta: response.status
		}
		return result
  }

	async insert(request: EquivalenciaRequest): Promise<EquivalenciaResponse> {
		const endpoint = `/api/tipos-unidad-equivalencia/`
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

	async update(request: EquivalenciaRequest): Promise<EquivalenciaResponse> {
		const endpoint = `/api/tipos-unidad-equivalencia/${request.id}`
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

	async delete(id: string): Promise<EquivalenciaResponse> {
		const endpoint = `/api/tipos-unidad-equivalencia/${id}`
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
