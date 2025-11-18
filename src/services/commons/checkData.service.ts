import API from '@/api'
import CheckDataResponse from '@/api/commons/CheckDataResponse'

const checkData = async (modelo: string): Promise<CheckDataResponse> => {
  switch (modelo) {
    case 'Articulo':
      return await API.ArticuloRepository.checkData()
    case 'Establecimiento':
      return await API.EstablecimientoRepository.checkData()
    case 'TipoEstablecimiento':
      return await API.TipoEstablecimientoRepository.checkData()
    case 'TipoUnidad':
      return await API.TipoUnidadRepository.checkData()
    case 'Precio':
      return await API.PrecioRepository.checkData()
    default:
      throw new Error(`Modelo ${modelo} no soportado para checkData`)
  }
}

export default checkData