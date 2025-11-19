import API from '@/api'

const resolverErrorUsuario = async (modeloId: string, ids: string[], usuarioId: string): Promise<string> => {
  return await API.CommonsRepository.resolveErrorUsuario(modeloId, ids, usuarioId)
}

export default resolverErrorUsuario