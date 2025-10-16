import Configuracion from './Configuracion';

export default interface ConfiguracionResponse {
  respuesta: number;
  data: Configuracion | Configuracion[];
}