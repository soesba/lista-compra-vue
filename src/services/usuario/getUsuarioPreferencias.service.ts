import API from '@/api'
import PreferenciaResponse from './models/PreferenciaResponse'

const getUsuarioPreferencias = async (usuarioId: string): Promise<PreferenciaResponse> => {
  return await API.UsuarioRepository.getPreferencias(usuarioId)
}

export default getUsuarioPreferencias
