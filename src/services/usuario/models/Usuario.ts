import Permiso from './Permiso';

export default interface Usuario {
    username: string;
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    fechaCreacion: string;
    esAdministrador: boolean;
    permisos: Array<Permiso>;
}