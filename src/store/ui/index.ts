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

const getDefaultAlertComponent = () => {
  return {
    show: false,
    props: {
      title: '',
      text: '',
      variant: '',
      type: ''
    }
  } 
}

export const useUiStore = defineStore('uiStore', {
  // convert to a function
  state: (): UiState => ({
    customDialog: getDefaultCustomDialog(),
    confirmDialog: getDefaultConfirmDialog(),
    alertComponent: getDefaultAlertComponent()
  }),
  getters: {
    getCustomDialog: (state) => state.customDialog,
    getConfirmDialog: (state) => state.confirmDialog,
    getAlertComponent: (state) => state.alertComponent
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
      this.confirmDialog.show = true
      this.confirmDialog.props = { ...props }
      this.confirmDialog.aceptarFn = aceptarFn
    },
    hideConfirmDialog () {
      this.confirmDialog.show = false
    },
    showAlertComponent (props: any) {
      this.alertComponent.props = { ...props }
      this.alertComponent.show = true
    },
    hideAlertComponent () {
      this.alertComponent.show = false
    }
  }
})