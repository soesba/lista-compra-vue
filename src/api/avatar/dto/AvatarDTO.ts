import ImagenDTO from '@/api/commons/dto/ImagenDTO';

export default interface AvatarDTO {
	id: string;
	imagen: ImagenDTO;
	fechaSubida: string;
}
