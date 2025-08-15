import { defineStore } from "pinia";
import type UiState from "./types";

const getDefaultCustomDialog = () => {
	return null
}

const getDefaultConfirmDialog = () => {
	return {
		visible: false,
		props: {
			title: 'Confirmación',
			text: ''
		},
		aceptarFn: () => {}
	}
}

const getDefaultAlertComponent = () => {
	return {
		visible: false,
		props: {
			title: '',
			text: '',
			variant: 'flat' as const,
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
		, },
	actions: {
		// no context as first argument, use `this` instead
    setCustomDialog (dialog: any) {
      this.customDialog = dialog
    },
		showCustomDialog ({ component, props, events }: any) {
			this.customDialog.visible = true
			this.customDialog.component = component
			this.customDialog.props = props
			this.customDialog.events = events
		},
		hideCustomDialog () {
			this.customDialog.visible = false
		},
		showConfirmDialog ({ props, aceptarFn }: any) {
			this.confirmDialog.visible = true
			this.confirmDialog.props = { ...props }
			this.confirmDialog.aceptarFn = aceptarFn
		},
		hideConfirmDialog () {
			this.confirmDialog.visible = false
		},
		showAlertComponent (props: any) {
			this.alertComponent.props = { ...props }
			this.alertComponent.visible = true
		},
		hideAlertComponent () {
			this.alertComponent.visible = false
		}
	}
})
