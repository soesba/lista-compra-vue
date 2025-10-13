import Avatar from '@/services/avatar/models/Avatar'
import AvatarDTO from '../dto/AvatarDTO'

export const DtoToModel = (dto: AvatarDTO): Avatar => {
  return {
    id: dto.id,
    imagen: dto.imagen,
    fechaSubida: dto.fechaSubida
  }
}

export const ModelToDto = (model: Avatar): AvatarDTO => {
  return {
    id: model.id,
    imagen: model.imagen,
    fechaSubida: model.fechaSubida
  }
}
