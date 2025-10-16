import ModeloDTO from './ModeloDTO';

export default interface ModeloResponseDTO {
  respuesta: number;
  data: ModeloDTO | ModeloDTO[];
}