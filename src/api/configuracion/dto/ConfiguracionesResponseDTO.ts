import ConfiguracionDTO from './ConfiguracionDTO';

export default interface ConfiguracionesResponseDTO {
  respuesta: number;
  data: ConfiguracionDTO[];
}
