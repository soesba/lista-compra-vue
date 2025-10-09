import API from "@/api"
import UsuarioResponse from './models/UsuarioResponse'

const getByUsername = async (username: string): Promise<UsuarioResponse> => {
  return await API.UsuarioRepository.getByUsername(username)
}

export default getByUsername
