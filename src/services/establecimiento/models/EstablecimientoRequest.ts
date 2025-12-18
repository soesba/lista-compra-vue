import Item from '@/services/desplegables/models/Item';
import type Direccion from "./Direccion";

export default interface EstablecimientoRequest {
	id?: string;
	nombre: string;
	tipoEstablecimiento: Item;
	logo: {
		type: string,
		content: string
	};
	notas: string;
	direcciones: Direccion[];
  fechaCreacion: string;
	borrable: boolean;
}
