import ArticuloFactory from "./articulo/ArticuloFactory"
import PrecioFactory from "./precio/PrecioFactory"
import EstablecimientoFactory from "./establecimiento/EstablecimientoFactory"
import TipoEstablecimientoFactory from "./tipoEstablecimiento/TipoEstablecimientoFactory"
import TipoUnidadFactory from "./tipoUnidad/TipoUnidadFactory"
import DesplegableFactory from "./desplegables/DesplegableFactory"
import EquivalenciaFactory from "./equivalencia/EquivalenciaFactory"

const API = {
  TipoUnidadRepository: TipoUnidadFactory.getInstance(),
  ArticuloRepository: ArticuloFactory.getInstance(),
  TipoEstablecimientoRepository: TipoEstablecimientoFactory.getInstance(),
  EstablecimientoRepository: EstablecimientoFactory.getInstance(),
  PrecioRepository: PrecioFactory.getInstance(),
  DesplegableRepository: DesplegableFactory.getInstance(),
  EquivalenciaRepository: EquivalenciaFactory.getInstance()
}
export default API