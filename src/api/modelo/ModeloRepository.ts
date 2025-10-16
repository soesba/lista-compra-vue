import ModeloResponse from '@/services/modelo/models/ModeloResponse';

export default interface ModeloRepository {
  get(): Promise<ModeloResponse>;
  getById(id: string): Promise<ModeloResponse>;
  getByNombre(nombre: string): Promise<ModeloResponse>;
}
