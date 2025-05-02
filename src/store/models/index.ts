import { defineStore } from "pinia"
import type ModelState from "./types"
import type Articulo from "@/services/articulo/models/Articulo"
import Precio from '@/services/precio/models/Precio'

const getDefaultEstablecimiento = (): any => null

const getDefaultArticulo = (): any => null

const getDefaultArticulos = (): [] => {
	return []
}

const getDefaultPrecio = (): any => null

export const useModelStore = defineStore('ModelStore', {
	state: (): ModelState => ({
		establecimiento: getDefaultEstablecimiento(),
    articulo: getDefaultArticulo(),
		articulos: getDefaultArticulos(),
    precio: getDefaultPrecio()
	}),
	getters: {
		getEstablecimiento: (state) => state.establecimiento,
    getArticulo: (state) => state.articulo,
		getArticulos: (state) => state.articulos,
    getPrecio: (state) => state.precio
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
		},
    setPrecio (precio: Precio) {
      this.precio = precio
    }
	}
})
