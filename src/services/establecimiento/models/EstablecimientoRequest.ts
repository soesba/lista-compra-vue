import type Direccion from "./Direccion";

export default interface EstablecimientoRequest {
	id?: string;
	nombre: string;
	tipoEstablecimiento: string;
	logo: {
		type: string,
		content: string
	};
	notas: string;
	direcciones: Direccion[];
	fechaCreacion: string;
	borrable: boolean;
}
