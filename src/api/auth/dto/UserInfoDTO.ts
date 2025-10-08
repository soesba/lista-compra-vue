import PermisoDTO from './PermisoDTO'

export default interface UserInfoDTO {
  username: string;
  esAdministrador: boolean;
  permisos: Array<PermisoDTO>;
}
