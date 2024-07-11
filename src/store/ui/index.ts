import { defineStore } from "pinia";
import type UiState from "./types";

const getDefaultDialog = () => {
  return {
    show: false,
    component: {},
    props: {}
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
    showDialog ({ component, props }: any) {
      this.dialog.show = true
      this.dialog.component = component
      this.dialog.props = props
      console.log(this.dialog)
    },
    hideDialog () {
      this.dialog.show = false
      this.dialog.component = ''
      this.dialog.props = {}
    }
  }
})