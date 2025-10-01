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
			variant: 'flat' as const,
			type: 'success' as const
		}
	}
}

export const useUiStore = defineStore('uiStore', {
	// convert to a function
	state: (): UiState => ({
		customDialog: getDefaultCustomDialog(),
		confirmDialog: getDefaultConfirmDialog(),
		alertComponent: getDefaultAlertComponent(),
    menuSortCards: null,
    menuShowCards: null
	}),
	getters: {
		getCustomDialog: (state) => state.customDialog,
		getConfirmDialog: (state) => state.confirmDialog,
		getAlertComponent: (state) => state.alertComponent,
    getMenuSortCards: (state) => state.menuSortCards || parseInt(import.meta.env.VITE_SORT_CARDS),
    getMenuShowCards: (state) => state.menuShowCards || parseInt(import.meta.env.VITE_SHOW_CARDS)
  },
	actions: {
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
		},
    setMenuSortCards(value: number) {
      this.menuSortCards = value
    },
    setMenuShowCards(value: number) {
      this.menuShowCards = value
    }
	}
})
