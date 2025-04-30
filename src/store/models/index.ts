import { defineStore } from "pinia"
import type ModelState from "./types"
import type Articulo from "@/services/articulo/models/Articulo"

const getDefaultEstablecimiento = (): any => null

const getDefaultArticulo = (): any => null

const getDefaultArticulos = (): [] => {
	return []
}

export const useModelStore = defineStore('ModelStore', {
	state: (): ModelState => ({
		establecimiento: getDefaultEstablecimiento(),
    articulo: getDefaultArticulo(),
		articulos: getDefaultArticulos()
	}),
	getters: {
		getEstablecimiento: (state) => state.establecimiento,
    getArticulo: (state) => state.articulo,
		getArticulos: (state) => state.articulos
  },
	actions: {
		setEstablecimiento (establecimiento: any) {
			this.establecimiento = establecimiento
		},
    setArticulo (articulo: Articulo) {
      this.articulo = articulo
    },
		setArticulos (articulos: Articulo[]) {
			this.articulos = articulos
		}
	}
})
