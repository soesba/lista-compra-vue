import type Item from "@/services/desplegables/models/Item";
import type Direccion from "./Direccion";

export default interface Establecimiento {
	id: string;
	tmpId?: string;
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
