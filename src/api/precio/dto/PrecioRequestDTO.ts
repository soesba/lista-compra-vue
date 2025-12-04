import type UnidadMedidaDTO from "./UnidadMedidaDTO";

export default interface PrecioRequestDTO {
	id: string;
	articulo: string;
	precio: number | null;
	marca: string;
	establecimiento: string;
	unidadesMedida: Array<UnidadMedidaDTO>;
	fechaCompra: Date;
	fechaCreacion: Date;
	notas: string;
	borrable: boolean;
}
