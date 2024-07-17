export default interface UiState {
  customDialog: {
    show: boolean,
    component: Object,
    props: Object,
    events: Object
  },
  confirmDialog: {
    show: boolean,
    props: {
      title: string;
      text: string;
    },
    aceptarFn: Function;
  }
}