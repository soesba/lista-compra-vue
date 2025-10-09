import PermisoDTO from './PermisoDTO';

export default interface UsuarioDTO {
    username: string;
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    fechaCreacion: string;
    esAdministrador: boolean;
    permisos: Array<PermisoDTO>;
}