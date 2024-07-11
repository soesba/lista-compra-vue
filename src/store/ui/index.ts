import { defineStore } from "pinia";
import type UiState from "./types";

const getDefaultDialog = () => {
  return {
    show: false,
    component: {},
    props: {},
    events: {}
  }
}
export const useUiStore = defineStore('uiStore', {
  // convert to a function
  state: (): UiState => ({
    dialog: getDefaultDialog()
  }),
  getters: {
    getDialog: (state) => state.dialog
,  },
  actions: {
    // no context as first argument, use `this` instead
    showDialog ({ component, props, events }: any) {
      this.dialog.show = true
      this.dialog.component = component
      this.dialog.props = props
      this.dialog.events = events
    },
    hideDialog () {
      this.dialog.show = false
    }
  }
})