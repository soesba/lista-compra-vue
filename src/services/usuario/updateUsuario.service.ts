import API from "@/api"
import UsuarioResponse from './models/UsuarioResponse'
import Usuario from './models/Usuario'

const update = async (data: Usuario): Promise<UsuarioResponse> => {
  return await API.UsuarioRepository.update(data)
}

export default update
