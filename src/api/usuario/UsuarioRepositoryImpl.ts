import UsuarioResponse from '@/services/usuario/models/UsuarioResponse';
import UsuarioRepository from './UsuarioRepository';
import UsuariosResponseDTO from './dto/UsuariosResponseDTO';
import { xhr } from '../config/Repository';
import { DtoToModel, ModelToDto } from './mapping/UsuarioMapping';
import UsuarioDTO from './dto/UsuarioDTO';
import UsuarioResponseDTO from './dto/UsuarioResponseDTO';
import Usuario from '@/services/usuario/models/Usuario';
import PreferenciaResponse from '@/services/usuario/models/PreferenciaResponse';
import ImagenResponseDTO from '../commons/ImagenResponseDTO';
import ImagenResponse from '@/services/commons/ImagenResponse';
import FotoRequest from '@/services/usuario/models/FotoRequest';

export default class UsuarioRepositoryImpl implements UsuarioRepository {
  async get(): Promise<UsuarioResponse> {
    const endpoint = '/api/usuarios'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<UsuariosResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: UsuarioDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<UsuarioResponse> {
    const endpoint = `/api/usuarios?id=${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<UsuarioResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async getByUsername(username: string): Promise<UsuarioResponse> {
    const endpoint = `/api/usuarios?username=${username}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<UsuarioResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async update(data: Usuario): Promise<UsuarioResponse> {
    const endpoint = '/api/usuarios'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const dataDTO: UsuarioDTO = ModelToDto(data)
    const response = await xhr.put<UsuarioDTO, UsuarioResponseDTO>(endpoint, dataDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async getPreferencias(userId: string): Promise<PreferenciaResponse> {
    const endpoint = `/api/usuarios/preferencias/${userId}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<PreferenciaResponse>(endpoint, { headers })
    return response.data
  }

  async getFoto(request: FotoRequest): Promise<ImagenResponse> {
    const requestEndpoint = request.username ? `?username=${request.username}` : `?id=${request.userId}`
    const endpoint = `/api/usuarios/foto${requestEndpoint}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ImagenResponseDTO>(endpoint, { headers })
    return response.data
  }
}
