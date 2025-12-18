import API from "@/api"
import UsuarioResponse from './models/UsuarioResponse'

const deleteUsuario = async (id: string): Promise<UsuarioResponse> => {
  return await API.UsuarioRepository.delete(id)
}

export default deleteUsuario
