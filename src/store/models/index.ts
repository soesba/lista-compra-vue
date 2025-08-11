import { defineStore } from "pinia"
import type ModelState from "./types"
import type Articulo from "@/services/articulo/models/Articulo"
import Precio from '@/services/precio/models/Precio'
import TipoEstablecimiento from '@/services/tipoEstablecimiento/models/TipoEstablecimiento'

const getDefaultEstablecimiento = (): any => {
  return {
    id: null,
    tmpId: null,
    nombre: null,
    tipoEstablecimiento: null,
    tipoEstablecimientoId: null,
    tipoEstablecimientoNombre: null,
    logo: {
      type: null,
      content: null
    },
    notas: null,
    direcciones: [],
    fechaCreacion: null,
    borrable: true
  }
}

const getDefaultArticulo = (): any => {
  return {
    id: null,
    tmpId: null,
    nombre: null,
    descripcion: null,
    tiposUnidad: [],
    fechaCreacion: null,
    tienePrecios: false,
    borrable: true,
    precios: []
  }
}

const getDefaultArticulos = (): [] => {
	return []
}

const getDefaultPrecio = (): any => {
  return {
    id: null,
    articulo: null,
    precio: null,
    marca: null,
    establecimiento: null,
    unidadesMedida: [],
    fechaCompra: null,
    fechaCreacion: null,
    notas: null,
    borrable: true
  }
}

const getDefaultTipoEstablecimiento = (): any => {
  return {
    id: null,
    nombre: null,
    abreviatura: null,
    fechaCreacion: null,
    borrable: true
  }
}

const getDefaultTipounidad = (): any => {
  return {
    id: null,
    nombre: null,
    abreviatura: null,
    fechaCreacion: null,
    borrable: true
  }
}

export const useModelStore = defineStore('ModelStore', {
	state: (): ModelState => ({
		establecimiento: getDefaultEstablecimiento(),
    articulo: getDefaultArticulo(),
		articulos: getDefaultArticulos(),
    precio: getDefaultPrecio(),
    tipoEstablecimiento: getDefaultTipoEstablecimiento(),
    tipoUnidad: getDefaultTipounidad()
	}),
	getters: {
		getEstablecimiento: (state) => state.establecimiento,
    getArticulo: (state) => state.articulo,
		getArticulos: (state) => state.articulos,
    getPrecio: (state) => state.precio,
    getTipoEstablecimiento: (state) => state.tipoEstablecimiento,
    getTipoUnidad: (state) => state.tipoUnidad
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
    },
    setTipoEstablecimiento (tipoEstablecimiento: TipoEstablecimiento) {
      this.tipoEstablecimiento = tipoEstablecimiento
    },
    setTipoUnidad (tipoUnidad: any) {
      this.tipoUnidad = tipoUnidad
    }
	}
})
