import API from '@/api'

const login = async (username: string, password: string): Promise<any> => {
  return await API.AuthRepository.login(username, password)
}

export default login