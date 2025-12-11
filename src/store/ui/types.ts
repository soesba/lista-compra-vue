export default interface UiState {
  menuSortCards: number | null,
  menuShowCards: number | null,
  customDialog: {
    show: boolean,
    component: object,
    props: object,
    events: object
  },
  actionDialog: {
    show: boolean,
    props: {
      type: 'confirmation' | 'done',
      showIcon?: boolean,
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
  },
  mask: {
    show: boolean,
    props: {
      text: string
    }
  }
}
