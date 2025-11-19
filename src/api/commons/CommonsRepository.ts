export default interface CommonsRepository {
  resolveErrorUsuario(modelo: string, ids: string[], usuarioId: string): Promise<any>;
}