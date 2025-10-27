import Modelo from './Modelo';

export default interface ModeloResponse {
  respuesta: number;
  data: Modelo | Modelo[];
}