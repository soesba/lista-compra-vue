import ImagenDTO from '@/api/commons/ImagenDTO';

export default interface AvatarDTO {
  id: string;
  nombre: string;
  imagen: ImagenDTO;
}
