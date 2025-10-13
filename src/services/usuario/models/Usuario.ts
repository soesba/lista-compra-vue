import Imagen from '@/services/commons/Imagen';
import Permiso from './Permiso';

export default interface Usuario {
    id: string;
    username: string;
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    foto: Imagen | null;
    fechaCreacion: string;
    esAdministrador: boolean;
    permisos: Array<Permiso>;
}