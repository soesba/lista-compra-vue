import Preferencia from '@/services/usuario/models/Preferencia';
import Permiso from './Permiso';

export default interface UserInfo {
  username: string;
  esAdministrador: boolean;
  permisos: Array<Permiso>;
  preferencias: Array<Preferencia>;
}
