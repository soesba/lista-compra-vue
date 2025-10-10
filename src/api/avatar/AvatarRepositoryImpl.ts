import AvatarResponse from '@/services/avatar/models/AvatarResponse';
import AvatarRepository from './AvatarRepository';
import AvataresResponseDTO from './dto/AvataresResponseDTO';
import { xhr } from '../config/Repository';
import { DtoToModel, ModelToDto } from './mapping/AvatarMapping';
import AvatarDTO from './dto/AvatarDTO';
import AvatarResponseDTO from './dto/AvatarResponseDTO';
import Avatar from '@/services/avatar/models/Avatar';

export default class AvatarRepositoryImpl implements AvatarRepository {
  async get(): Promise<AvatarResponse> {
    const endpoint = '/api/avatares'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<AvataresResponseDTO>(endpoint, { headers })
    const result = {
      data: response.data.data.map((item: AvatarDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<AvatarResponse> {
    const endpoint = `/api/avatares?id=${id}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<AvatarResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async getByNombre(username: string): Promise<AvatarResponse> {
    const endpoint = `/api/avatares?username=${username}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<AvatarResponseDTO>(endpoint, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async update(data: Avatar): Promise<AvatarResponse> {
    const endpoint = '/api/avatares'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const dataDTO: AvatarDTO = ModelToDto(data)
    const response = await xhr.put<AvatarDTO, AvatarResponseDTO>(endpoint, dataDTO, { headers })
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }
}
