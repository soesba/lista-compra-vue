import ImagenDTO from '@/api/commons/ImagenDTO';
import PermisoDTO from './PermisoDTO';

export default interface UsuarioDTO {
    id: string;
    username: string;
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    foto: ImagenDTO;
    fechaCreacion: string;
    esAdministrador: boolean;
    permisos: Array<PermisoDTO>;
}