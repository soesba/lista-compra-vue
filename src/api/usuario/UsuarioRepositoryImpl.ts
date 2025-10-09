import UsuarioResponse from '@/services/usuario/models/UsuarioResponse';
import UsuarioRepository from './UsuarioRepository';
import UsuariosResponseDTO from './dto/UsuariosResponseDTO';
import { xhr } from '../config/Repository';
import { DTOtoModel } from './mapping/UsuarioMapping';
import UsuarioDTO from './dto/UsuarioDTO';
import UsuarioResponseDTO from './dto/UsuarioResponseDTO';

export default class UsuarioRepositoryImpl implements UsuarioRepository {
  async get (): Promise<UsuarioResponse> {
const endpoint = '/api/usuarios'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<UsuariosResponseDTO>(endpoint, { headers})
		const result = {
			data: response.data.data.map((item: UsuarioDTO) => DTOtoModel(item)),
			respuesta: response.status
		}
		return result
  }

  async getById (id: string): Promise<UsuarioResponse> {
    const endpoint = `/api/usuarios?id=${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<UsuarioResponseDTO>(endpoint, { headers})
    const result = {
      data: DTOtoModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async getByUsername (username: string): Promise<UsuarioResponse> {
    const endpoint = `/api/usuarios?username=${username}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<UsuarioResponseDTO>(endpoint, { headers})
    const result = {
      data: DTOtoModel(response.data.data),
      respuesta: response.status
    }
    return result
  }
}
