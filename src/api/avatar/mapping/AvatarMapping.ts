import Avatar from '@/services/avatar/models/Avatar'
import AvatarDTO from '../dto/AvatarDTO'

export const DtoToModel = (dto: AvatarDTO): Avatar => {
  return {
    id: dto.id,
    nombre: dto.nombre,
    imagen: dto.imagen
  }
}

export const ModelToDto = (model: Avatar): AvatarDTO => {
  return {
    id: model.id,
    nombre: model.nombre,
    imagen: model.imagen
  }
}
