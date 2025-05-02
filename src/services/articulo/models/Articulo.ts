import Precio from '@/services/precio/models/Precio';

export default interface Articulo {
	id: string;
	nombre: string;
	descripcion: string;
	tiposUnidad: {
		id: string;
		nombre: string;
	}[];
	fechaCreacion: string;
	tienePrecios: boolean;
	borrable: boolean;
  precios?: Array<Precio>;
}
