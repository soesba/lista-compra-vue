import API from "@/api"
import AvatarResponse from './models/AvatarResponse'
import Avatar from './models/Avatar'

const insert = async (data: Avatar): Promise<AvatarResponse> => {
  return await API.AvatarRepository.insert(data)
}

export default insert
