import ArticuloFactory from "./articulo/ArticuloFactory"
import CompraFactory from "./compra/CompraFactory"
import EstablecimientoFactory from "./establecimiento/EstablecimientoFactory"
import TipoEstablecimientoFactory from "./tipoEstablecimiento/TipoEstablecimientoFactory"
import TipoUnidadFactory from "./tipoUnidad/TipoUnidadFactory"

const API = {
  TipoUnidadRepository: TipoUnidadFactory.getInstance(),
  ArticuloRepository: ArticuloFactory.getInstance(),
  TipoEstablecimientoRepository: TipoEstablecimientoFactory.getInstance(),
  EstablecimientoRepository: EstablecimientoFactory.getInstance(),
  CompraRepository: CompraFactory.getInstance()
}
export default API