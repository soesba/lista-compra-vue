import ImagenDTO from '@/api/commons/dto/ImagenDTO';
import PermisoDTO from './PermisoDTO';

export default interface UsuarioDTO {
  id: string;
  username: string;
  nombre: string;
  primerApellido?: string;
  segundoApellido?: string;
  email?: string;
  foto?: ImagenDTO | null;
  fechaCreacion: string;
  rol: string;
  permisos: Array<PermisoDTO>;
  preferencias: {
    configuracionId: string;
    modeloId: string;
    valor: string;
  }[];
}