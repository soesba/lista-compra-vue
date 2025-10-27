import API from '@/api'
import AvatarResponse from './models/AvatarResponse'

const eliminar = async (id: string): Promise<AvatarResponse> => {
  return await API.AvatarRepository.delete(id)
}

export default eliminar
