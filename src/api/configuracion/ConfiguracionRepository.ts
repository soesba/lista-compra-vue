import ConfiguracionResponse from '@/services/configuracion/models/ConfiguracionResponse';

export default interface ConfiguracionRepository {
  getConfiguraciones(): Promise<ConfiguracionResponse>;
  getConfiguracionById(id: string): Promise<ConfiguracionResponse>;
  getConfiguracionesByCategoria(categoria: string): Promise<ConfiguracionResponse>;
  getConfiguracionesByUsuarioId(usuarioId: string): Promise<ConfiguracionResponse>;
}
