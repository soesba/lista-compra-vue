import AuthFactory from './auth/AuthFactory'
import ArticuloFactory from "./articulo/ArticuloFactory"
import PrecioFactory from "./precio/PrecioFactory"
import EstablecimientoFactory from "./establecimiento/EstablecimientoFactory"
import TipoEstablecimientoFactory from "./tipoEstablecimiento/TipoEstablecimientoFactory"
import TipoUnidadFactory from "./tipoUnidad/TipoUnidadFactory"
import DesplegableFactory from "./desplegables/DesplegableFactory"
import EquivalenciaFactory from "./equivalencia/EquivalenciaFactory"
import UsuarioFactory from './usuario/UsuarioFactory'
import AvatarFactory from './avatar/AvatarFactory'
import ConfiguracionFactory from './configuracion/ConfiguracionFactory'
import ModeloFactory from './modelo/ModeloFactory'
import CommonsFactory from './commons/CommonsFactory'

const API = {
  AuthRepository: AuthFactory.getInstance(),
  CommonsRepository: CommonsFactory.getInstance(),
  TipoUnidadRepository: TipoUnidadFactory.getInstance(),
  ArticuloRepository: ArticuloFactory.getInstance(),
  TipoEstablecimientoRepository: TipoEstablecimientoFactory.getInstance(),
  EstablecimientoRepository: EstablecimientoFactory.getInstance(),
  PrecioRepository: PrecioFactory.getInstance(),
  DesplegableRepository: DesplegableFactory.getInstance(),
  EquivalenciaRepository: EquivalenciaFactory.getInstance(),
  UsuarioRepository: UsuarioFactory.getInstance(),
  AvatarRepository: AvatarFactory.getInstance(),
  ConfiguracionRepository: ConfiguracionFactory.getInstance(),
  ModeloRepository: ModeloFactory.getInstance()
}
export default API
