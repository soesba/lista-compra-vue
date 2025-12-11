import API from '@/api'

const refresh = async (refreshToken: string): Promise<any> => {
  return await API.AuthRepository.refresh(refreshToken)
}

export default refresh