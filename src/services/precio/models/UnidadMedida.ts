import Equivalencia from '@/services/equivalencia/models/Equivalencia';

export default interface UnidadMedida {
	id: string;
	nombre: string;
	valor: number;
  equivalencias?: Equivalencia[];
}
