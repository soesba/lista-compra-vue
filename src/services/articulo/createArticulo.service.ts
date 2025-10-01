import API from "@/api"
import type ArticuloResponse from "./models/ArticuloResponse"
import type ArticuloRequest from "./models/ArticuloRequest"
import type Articulo from "./models/Articulo"
import { modelStore } from "@/store/instances"
import getArticuloById from "./getArticuloById.service"

const create = async (request: ArticuloRequest): Promise<ArticuloResponse> => {
	const response = await API.ArticuloRepository.insert(request)
	const articulo = (await getArticuloById((response.data as Articulo).id)).data as Articulo
	const listaArticulos = modelStore.articulos
	listaArticulos.push(articulo)
	modelStore.articulos = listaArticulos
	return response
}

export default create
