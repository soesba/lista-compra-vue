import Item from '@/services/desplegables/models/Item';

export default interface ArticuloRequest {
	id?: string;
	nombre: string;
	descripcion: string;
	tiposUnidad: Array<Item>;
	borrable: boolean;
  notas: string;
}
