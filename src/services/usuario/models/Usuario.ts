import Imagen from '@/services/commons/models/Imagen';
import Permiso from './Permiso';

export default interface Usuario {
  id: string;
  username: string;
  nombre: string;
  primerApellido?: string;
  segundoApellido?: string;
  email?: string;
  foto?: Imagen | null;
  fechaCreacion: string;
  rol: string;
  permisos: Array<Permiso>;
  preferencias: {
    configuracionId: string;
    modeloId: string;
    valor: string;
  }[];
}