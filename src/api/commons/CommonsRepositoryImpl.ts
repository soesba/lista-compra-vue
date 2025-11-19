import { xhr } from '../config/Repository';
import CommonsRepository from './CommonsRepository';

export default class CommonsRepositoryImpl implements CommonsRepository {
  async resolveErrorUsuario(modelo: string, ids: string[], usuarioId: string): Promise<any> {
    const endpoint = `/api/common/asignarUsuario`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const requestDTO = {
      modelo,
      ids,
      usuarioId
    }
    const response = await xhr.post<any, any>(endpoint, requestDTO, { headers })
    const result = {
      data: (response.data.data),
      respuesta: response.status
    }
    return result
  }
}
