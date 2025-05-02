import type Articulo from "@/services/articulo/models/Articulo";
import type Establecimiento from "@/services/establecimiento/models/Establecimiento";
import Precio from '@/services/precio/models/Precio';

export default interface ModelState {
	establecimiento: Establecimiento,
  articulo: Articulo | null,
	articulos: Articulo[],
  precio: Precio | null
}
