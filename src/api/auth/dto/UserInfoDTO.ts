import PermisoDTO from '../../usuario/dto/PermisoDTO'

export default interface UserInfoDTO {
  username: string;
  esAdministrador: boolean;
  permisos: Array<PermisoDTO>;
}
