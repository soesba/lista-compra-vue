import API from '@/api'
import ImagenResponse from '../commons/models/ImagenResponse'
import FotoRequest from './models/FotoRequest'

const getUsuarioFoto = async (request: FotoRequest): Promise<ImagenResponse> => {
	return await API.UsuarioRepository.getFoto(request)
}

export default getUsuarioFoto
