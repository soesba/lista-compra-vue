import type Articulo from "@/services/articulo/models/Articulo";
import type Establecimiento from "@/services/establecimiento/models/Establecimiento";

export default interface ModelState {
  establecimiento: Establecimiento,
  articulos: Articulo[]
}
