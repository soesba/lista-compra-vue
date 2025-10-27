import ModeloResponse from '@/services/modelo/models/ModeloResponse';

export default interface ModeloRepository {
  get(): Promise<ModeloResponse>;
  getById(id: string): Promise<ModeloResponse>;
  getByNombre(nombre: string): Promise<ModeloResponse>;
  checkUso(modeloId: string): Promise<ModeloResponse>;
  deleteModelo(modeloId: string): Promise<ModeloResponse>;
}
