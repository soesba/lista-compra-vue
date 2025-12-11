import API from '@/api'

const cambiarPassword = async (username: string, newPassword: string): Promise<any> => {
  return await API.AuthRepository.changePassword(username, newPassword)
}

export default cambiarPassword