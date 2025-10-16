import ModeloResponse from '@/services/modelo/models/ModeloResponse';
import ModeloRepository from './ModeloRepository';
import ModeloResponseDTO from './dto/ModeloResponseDTO';
import { xhr } from '../config/Repository';

export default class ModeloRepositoryImpl implements ModeloRepository {
  async get(): Promise<ModeloResponse> {
      const endpoint = `/api/modelos`
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      const response = await xhr.get<ModeloResponseDTO>(endpoint, { headers})
      const result = {
        data: response.data.data,
        respuesta: response.status
      }
      return result
  }

  async getById(id: string): Promise<ModeloResponse> {
    const endpoint = `/api/modelos?id=${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ModeloResponseDTO>(endpoint, { headers})
    const result = {
      data: response.data.data,
      respuesta: response.status
    }
    return result
  }


  async getByNombre(nombre: string): Promise<ModeloResponse> {
    const endpoint = `/api/modelos?nombre=${nombre}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ModeloResponseDTO>(endpoint, { headers})
    const result = {
      data: response.data.data,
      respuesta: response.status
    }
    return result
  }
}
