import Permiso from './Permiso';

export default interface UserInfo {
  username: string;
  esAdministrador: boolean;
  permisos: Array<Permiso>;
}
