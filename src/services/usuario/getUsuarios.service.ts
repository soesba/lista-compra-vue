import API from "@/api"
import UsuarioResponse from './models/UsuarioResponse'

const get = async (): Promise<UsuarioResponse> => {
  return await API.UsuarioRepository.get()
}

export default get
