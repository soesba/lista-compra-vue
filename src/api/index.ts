import ArticuloFactory from "./articulo/ArticuloFactory"
import TipoUnidadFactory from "./tipoUnidad/TipoUnidadFactory"

const API = {
  TipoUnidadRepository: TipoUnidadFactory.getInstance(),
  ArticuloRepository: ArticuloFactory.getInstance()
}
export default API