import API from "@/api"
import AvatarResponse from './models/AvatarResponse'

const get = async (): Promise<AvatarResponse> => {
  return await API.AvatarRepository.get()
}

export default get
