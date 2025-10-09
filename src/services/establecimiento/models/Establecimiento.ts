import type Item from "@/services/desplegables/models/Item";
import type Direccion from "./Direccion";
import Imagen from '@/services/commons/Imagen';

export default interface Establecimiento {
	id: string;
	tmpId?: string;
	nombre: string;
	tipoEstablecimiento: Item;
  tipoEstablecimientoId: string;
  tipoEstablecimientoNombre: string;
	logo: Imagen;
	notas: string;
	direcciones: Direccion[];
	fechaCreacion: string;
	borrable: boolean;
}
