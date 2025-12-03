import EquivalenciaDTO from '@/api/equivalencia/dto/EquivalenciaDTO';

export default interface TipoUnidadRequestDTO {
	id?: string;
	nombre: string;
	abreviatura: string;
  equivalencias: EquivalenciaDTO[];
	borrable: boolean;
}
