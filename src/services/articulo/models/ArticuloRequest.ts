export default interface ArticuloRequest {
	id?: string;
	nombre: string;
	descripcion: string;
	tiposUnidad: string[];
	borrable: boolean;
}
