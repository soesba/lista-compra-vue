import API from "@/api"
import type PrecioResponse from "./models/PrecioResponse"
import type PrecioRequest from "./models/PrecioRequest"
import { modelStore } from "@/main"
import type Precio from "./models/Precio"

const create = async (request: PrecioRequest): Promise<PrecioResponse> => {
  const response = await API.PrecioRepository.insert(request)
  const nuevoPrecio = (response.data as Precio)
  const listaArticulos = modelStore.articulos
  listaArticulos.map(item => {
    return item.id === nuevoPrecio.id ? nuevoPrecio : item
  })
  modelStore.articulos = listaArticulos
  return response
}

export default create
