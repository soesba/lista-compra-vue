import ModeloResponse from '@/services/modelo/models/ModeloResponse';
import ModeloRepository from './ModeloRepository';
import ModeloResponseDTO from './dto/ModeloResponseDTO';
import { xhr } from '../config/Repository';

export default class ModeloRepositoryImpl implements ModeloRepository {
  async get(): Promise<ModeloResponse> {
      const endpoint = `/api/modelos`
      const response = await xhr.get<ModeloResponseDTO>(endpoint, { showMask: false })
      const result = {
        data: response.data.data,
        respuesta: response.status
      }
      return result
  }

  async getById(id: string): Promise<ModeloResponse> {
    const endpoint = `/api/modelos?id=${id}`
    const response = await xhr.get<ModeloResponseDTO>(endpoint, { showMask: false })
    const result = {
      data: response.data.data,
      respuesta: response.status
    }
    return result
  }


  async getByNombre(nombre: string): Promise<ModeloResponse> {
    const endpoint = `/api/modelos?nombre=${nombre}`
    const response = await xhr.get<ModeloResponseDTO>(endpoint, { showMask: false })
    const result = {
      data: response.data.data,
      respuesta: response.status
    }
    return result
  }

  async checkUso(modeloId: string): Promise<ModeloResponse> {
    const endpoint = `/api/modelos/checkuso/${modeloId}`
    const response = await xhr.get<ModeloResponseDTO>(endpoint)
    const result = {
      data: response.data.data,
      respuesta: response.status
    }
    return result
  }

  async deleteModelo(modeloId: string): Promise<ModeloResponse> {
    const endpoint = `/api/modelos/${modeloId}`
    const response = await xhr.delete<ModeloResponseDTO>(endpoint)
    const result = {
      data: response.data.data,
      respuesta: response.status
    }
    return result
  }
}
