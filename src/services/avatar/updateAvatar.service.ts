import API from "@/api"
import AvatarResponse from './models/AvatarResponse'
import Avatar from './models/Avatar'

const update = async (data: Avatar): Promise<AvatarResponse> => {
  return await API.AvatarRepository.update(data)
}

export default update
