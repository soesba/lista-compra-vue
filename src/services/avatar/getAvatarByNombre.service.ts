import API from "@/api"
import AvatarResponse from './models/AvatarResponse'

const getByNombre = async (nombre: string): Promise<AvatarResponse> => {
  return await API.AvatarRepository.getByNombre(nombre)
}

export default getByNombre
