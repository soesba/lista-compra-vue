import { defineStore } from "pinia";
import type UiState from "./types";

const getDefaultCustomDialog = () => {
  return {
    show: false,
    component: {},
    props: {},
    events: {}
  }
}

const getDefaultConfirmDialog = () => {
  return {
    show: false,
    props: {
      title: 'Confirmación',
      text: ''
    },
    aceptarFn: () => {}
  }
}

export const useUiStore = defineStore('uiStore', {
  // convert to a function
  state: (): UiState => ({
    customDialog: getDefaultCustomDialog(),
    confirmDialog: getDefaultConfirmDialog()
  }),
  getters: {
    getCustomDialog: (state) => state.customDialog,
    getConfirmDialog: (state) => state.confirmDialog
,  },
  actions: {
    // no context as first argument, use `this` instead
    showCustomDialog ({ component, props, events }: any) {
      this.customDialog.show = true
      this.customDialog.component = component
      this.customDialog.props = props
      this.customDialog.events = events
    },
    hideCustomDialog () {
      this.customDialog.show = false
    },
    showConfirmDialog ({ props, aceptarFn }: any) {
      console.log("🚀 ~ showConfirmDialog ~ aceptarFn:", aceptarFn)
      this.confirmDialog.show = true
      this.confirmDialog.props = { ...props }
      this.confirmDialog.aceptarFn = aceptarFn
    },
    hideConfirmDialog () {
      this.confirmDialog.show = false
    }
  }
})