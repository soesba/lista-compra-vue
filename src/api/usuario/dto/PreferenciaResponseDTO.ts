import PreferenciaDTO from './PreferenciaDTO';

export default interface PreferenciaResponseDTO {
  respuesta: number;
  data: PreferenciaDTO | PreferenciaDTO[];
}
