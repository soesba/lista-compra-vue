import API from "@/api"
import UsuarioResponse from './models/UsuarioResponse'

const getById = async (id: string): Promise<UsuarioResponse> => {
  return await API.UsuarioRepository.getById(id)
}

export default getById
