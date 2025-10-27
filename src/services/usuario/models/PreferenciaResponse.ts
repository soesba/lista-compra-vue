import Preferencia from './Preferencia';

export default interface PreferenciaResponse {
  respuesta: number;
  data: Preferencia | Preferencia[];
}
