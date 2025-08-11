export default interface EventState {
	eventData: {
		adding: boolean,
		data: object,
    order: number | null,
    show: number | null
	},
  routes: {
    detail: string,
    edit: string,
    add: string,
    save: string
  }
}
