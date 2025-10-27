import ImagenDTO from '@/api/commons/ImagenDTO';

export default interface AvatarDTO {
  id: string;
  imagen: ImagenDTO;
  fechaSubida: string;
}
