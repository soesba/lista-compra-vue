import type EquivalenciaDTO from '@/api/equivalencia/dto/EquivalenciaDTO'

export default interface TipoUnidadDTO {
	id: string;
	nombre: string;
	abreviatura: string;
	equivalencias: EquivalenciaDTO[];
	fechaCreacion: string;
	borrable: boolean;
}
