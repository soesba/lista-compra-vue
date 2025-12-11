import Equivalencia from '@/services/equivalencia/models/Equivalencia';

export default interface TipoUnidadRequest {
	id?: string;
	nombre: string;
	abreviatura: string;
  equivalencias: Equivalencia[];
	borrable: boolean;
  fechaCreacion: string;
}
