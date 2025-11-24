import API from '@/api'

const resolverErrorRol = async (modeloId: string, ids: string[], rolId: string): Promise<string> => {
  return await API.CommonsRepository.resolveErrorRol(modeloId, ids, rolId)
}

export default resolverErrorRol