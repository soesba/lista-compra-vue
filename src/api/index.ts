import ArticuloFactory from "./articulo/ArticuloFactory"
import PrecioFactory from "./precio/PrecioFactory"
import EstablecimientoFactory from "./establecimiento/EstablecimientoFactory"
import TipoEstablecimientoFactory from "./tipoEstablecimiento/TipoEstablecimientoFactory"
import TipoUnidadFactory from "./tipoUnidad/TipoUnidadFactory"

const API = {
  TipoUnidadRepository: TipoUnidadFactory.getInstance(),
  ArticuloRepository: ArticuloFactory.getInstance(),
  TipoEstablecimientoRepository: TipoEstablecimientoFactory.getInstance(),
  EstablecimientoRepository: EstablecimientoFactory.getInstance(),
  PrecioRepository: PrecioFactory.getInstance()
}
export default API