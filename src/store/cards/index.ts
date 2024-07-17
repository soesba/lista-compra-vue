import { defineStore } from "pinia";
import type EventCardState from "./types";


const getDefaultSaveCard = () => {
  return {
    adding: false,
    data: {}
  }
}
export const useEventCardStore = defineStore('eventCardStore', {
  // convert to a function
  state: (): EventCardState => ({
    eventCard: getDefaultSaveCard()
  }),
  getters: {
    getEventCard: (state) => state.eventCard
,  },
  actions: {
    // no context as first argument, use `this` instead
    saveCard (eventData: any) {
      this.eventCard = { ...eventData }
    },
    cancelCard () {
      this.eventCard.adding = false
      this.eventCard.data = {}
    }
  }
})