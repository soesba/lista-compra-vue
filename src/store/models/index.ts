import { defineStore } from "pinia"
import type ModelState from "./types"

const getDefaultEstablecimiento = (): any => {
  return null
}

export const useModelStore = defineStore('ModelStore', {
  state: (): ModelState => ({
    establecimiento: getDefaultEstablecimiento()
  }),
  getters: {
    getEstablecimiento: (state) => state.establecimiento
,  },
  actions: {
    setEstablecimiento (establecimiento: any) {
      this.establecimiento = establecimiento
    }
  }
})