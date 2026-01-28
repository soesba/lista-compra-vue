import { xhr } from '../config/Repository';
import CommonsRepository from './CommonsRepository';

export default class CommonsRepositoryImpl implements CommonsRepository {
  async resolveErrorUsuario(modelo: string, ids: string[], usuarioId: string): Promise<any> {
    const endpoint = `/api/common/asignarUsuario`
    const requestDTO = {
      modelo,
      ids,
      usuarioId
    }
    const response = await xhr.post<any, any>(endpoint, requestDTO)
    const result = {
      data: (response.data.data),
      respuesta: response.status
    }
    return result
  }

  async resolveErrorRol(modelo: string, ids: string[], rolId: string): Promise<any> {
    const endpoint = `/api/common/asignarRol`
    const requestDTO = {
      modelo,
      ids,
      rolId
    }
    const response = await xhr.post<any, any>(endpoint, requestDTO)
    const result = {
      data: (response.data.data),
      respuesta: response.status
    }
    return result
  }
}
