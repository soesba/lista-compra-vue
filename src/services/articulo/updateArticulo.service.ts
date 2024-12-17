import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"
import type ArticuloRequest from "./models/ArticuloRequest"
import { modelStore } from "@/main"
import type Articulo from "./models/Articulo"
import getArticuloById from "./getArticuloById.service"

const update = async (request: ArticuloRequest): Promise<ArticuloResponse> => {
	const response = await API.ArticuloRepository.update(request)
	const articulo = (await getArticuloById((response.data as Articulo).id)).data as Articulo  
	const listaArticulos = modelStore.articulos
	listaArticulos.map(item => {
		return item.id === articulo.id ? articulo : item
	})
	modelStore.articulos = listaArticulos
	return response
}

export default update
