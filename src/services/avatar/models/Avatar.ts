import Imagen from '@/services/commons/models/Imagen';

export default interface Avatar {
	id: string;
	imagen: Imagen;
	fechaSubida: string;
}
