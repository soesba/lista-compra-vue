import ImagenDTO from '@/api/commons/dto/ImagenDTO';
import PermisoDTO from './PermisoDTO';
import ItemDTO from '@/api/desplegables/dto/ItemDTO';

export default interface UsuarioDTO {
  id: string;
  username: string;
  nombre: string;
  primerApellido?: string;
  segundoApellido?: string;
  email?: string;
  foto?: ImagenDTO | null;
  fechaCreacion: Date;
  esAdministrador: boolean;
  rol: ItemDTO | null;
  permisos: Array<PermisoDTO>;
  preferencias: {
    configuracionId: string;
    modeloId: string;
    valor: string;
  }[];
}