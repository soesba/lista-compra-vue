import API from '@/api'
import UnidadMedida from './models/UnidadMedida'
import PrecioResponse from './models/PrecioResponse'

const updateUnidadesMedidaPrecio = async (precioId: string, unidades: Array<UnidadMedida>): Promise<PrecioResponse> => {
  return await API.PrecioRepository.updateUnidadesMedida(precioId, unidades)
}

export default updateUnidadesMedidaPrecio
