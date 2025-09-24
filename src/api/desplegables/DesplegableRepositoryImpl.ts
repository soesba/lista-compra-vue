import type ItemResponse from "@/services/desplegables/models/ItemResponse"
import type DesplegableRepository from "./DesplegableRepository"
import { xhr } from "../config/Repository"
import ItemResponseDTO from './dto/ItemResponseDTO'

export default class DesplegableRepositoryImpl implements DesplegableRepository {
	async get (tipoDato: string): Promise<ItemResponse> {
		const endpoint = `/api/${tipoDato}/desplegable`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<ItemResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data,
			respuesta: response.status
		}
		return result
	}
}
