import API from '@/api'
import CheckDataResponse from '@/api/commons/CheckDataResponse'

const checkData = async (modelo: string): Promise<CheckDataResponse> => {
  if (modelo === 'Articulo') {
    return await API.ArticuloRepository.checkData()
  } else {
    throw new Error(`Modelo ${modelo} no soportado para checkData`)
  }
}

export default checkData