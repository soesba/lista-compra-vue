import API from "@/api"
import AvatarResponse from './models/AvatarResponse'

const getById = async (id: string): Promise<AvatarResponse> => {
  return await API.AvatarRepository.getById(id)
}

export default getById
