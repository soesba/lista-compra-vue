import API from '@/api'

const registrarUsuario = async (username: string, email: string, password: string): Promise<any> => {
  return await API.AuthRepository.register(username, email, password)
}

export default registrarUsuario