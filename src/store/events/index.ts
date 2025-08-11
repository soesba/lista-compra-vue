import { defineStore } from "pinia";
import type EventState from "./types";


const getDefaultEvenData = () => {
	return {
		adding: false,
		data: {},
    order: null,
    show: null
	}
}

const getDefaultRoutes = () => {
  return {
    detail: '',
    edit: '',
    add: '',
    save: ''
  }
}

export const useEventStore = defineStore('eventStore', {
	// convert to a function
	state: (): EventState => ({
		eventData: getDefaultEvenData(),
    routes: getDefaultRoutes()
	}),
	getters: {
		getEventData: (state) => state.eventData,
    getRoutes: (state) => state.routes
  },
	actions: {
		setRoutes (routes: any) {
      this.routes = routes
    },
    addCard (eventData: any) {
      this.eventData = { ...eventData }
    },
		saveCard (eventData: any) {
			this.eventData = { ...eventData }
		},
		cancelCard () {
			this.eventData.adding = false
			this.eventData.data = {}
		},
		deleteCard (eventData: any) {
			this.eventData = { ...eventData }
		},
    sortCards (eventData: any) {
      this.eventData = { ...eventData }
    },
    showCards (eventData: any) {
      this.eventData = { ...eventData }
    }
	}
})
