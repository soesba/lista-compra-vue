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
    const response = await xhr.get<AvataresResponseDTO>(endpoint)
    const result = {
      data: response.data.data.map((item: AvatarDTO) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getById(id: string): Promise<AvatarResponse> {
    const endpoint = `/api/avatares/${id}`
    const response = await xhr.get<AvatarResponseDTO>(endpoint)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async insert(data: Avatar): Promise<AvatarResponse> {
    const endpoint = '/api/avatares'
    const dataDTO: AvatarDTO = ModelToDto(data)
    const response = await xhr.post<AvatarDTO, AvatarResponseDTO>(endpoint, dataDTO)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }

  async delete(id: string): Promise<AvatarResponse> {
    const endpoint = `/api/avatares/${id}`
    const response = await xhr.delete<AvatarResponseDTO>(endpoint)
    const result = {
      data: DtoToModel(response.data.data),
      respuesta: response.status
    }
    return result
  }
}
