import Imagen from '@/services/commons/models/Imagen';
import Permiso from './Permiso';
import Item from '@/services/desplegables/models/Item';

export default interface Usuario {
  id: string;
  username: string;
  nombre: string;
  primerApellido?: string;
  segundoApellido?: string;
  email?: string;
  foto?: Imagen | null;
  fechaCreacion: string;
  esAdministrador: boolean;
  rol: Item | null;
  permisos: Array<Permiso>;
  preferencias: {
    configuracionId: string;
    modeloId: string;
    valor: string;
  }[];
}