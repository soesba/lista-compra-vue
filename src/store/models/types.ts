import type Articulo from "@/services/articulo/models/Articulo"
import type Establecimiento from "@/services/establecimiento/models/Establecimiento"
import Precio from '@/services/precio/models/Precio'
import TipoEstablecimiento from '@/services/tipoEstablecimiento/models/TipoEstablecimiento'
import TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'

export default interface ModelState {
	establecimiento: Establecimiento,
  articulo: Articulo,
	articulos: Articulo[],
  precio: Precio,
  tipoEstablecimiento: TipoEstablecimiento,
  tipoUnidad: TipoUnidad
}
