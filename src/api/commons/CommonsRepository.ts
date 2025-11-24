export default interface CommonsRepository {
  resolveErrorUsuario(modelo: string, ids: string[], usuarioId: string): Promise<any>;
  resolveErrorRol(modelo: string, ids: string[], rolId: string): Promise<any>;
}