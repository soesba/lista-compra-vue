export default interface UiState {
  menuSortCards: number | null,
  menuShowCards: number | null,
	customDialog: {
		show: boolean,
		component: object,
		props: object,
		events: object
	},
	confirmDialog: {
		show: boolean,
		props: {
			title: string;
			text: string;
		},
		aceptarFn: Function;
	},
	alertComponent: {
		show: boolean,
		props: {
			title: string,
			text: string,
			variant: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain',
			type: any
		}
	}
}
