export default interface ArticuloRequestDTO {
	id?: string;
	nombre: string;
	descripcion: string;
	tiposUnidad: string[];
	borrable: boolean;
}
