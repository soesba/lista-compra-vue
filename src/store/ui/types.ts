export default interface UiState {
	customDialog: any,
	confirmDialog: {
		visible: boolean,
		props: {
			title: string;
			text: string;
		},
		aceptarFn: Function;
	},
	alertComponent: {
		visible: boolean,
		props: {
			title: string,
			text: string,
			variant: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain',
			type: any
		}
	}
}
