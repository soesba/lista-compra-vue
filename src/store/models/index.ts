import { defineStore } from "pinia"
import type ModelState from "./types"
import type Articulo from "@/services/articulo/models/Articulo"

const getDefaultEstablecimiento = (): any => {
	return null
}

const getDefaultArticulos = (): [] => {
	return []
}

export const useModelStore = defineStore('ModelStore', {
	state: (): ModelState => ({
		establecimiento: getDefaultEstablecimiento(),
		articulos: getDefaultArticulos()
	}),
	getters: {
		getEstablecimiento: (state) => state.establecimiento,
		getArticulos: (state) => state.articulos
		, },
	actions: {
		setEstablecimiento (establecimiento: any) {
			this.establecimiento = establecimiento
		},
		setArticulos (articulos: Articulo[]) {
			this.articulos = articulos
		}
	}
})
