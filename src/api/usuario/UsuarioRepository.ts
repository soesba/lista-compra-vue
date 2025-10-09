import UsuarioResponse from '@/services/usuario/models/UsuarioResponse';

export default interface UsuarioRepository {
  get (): Promise<UsuarioResponse>;
  getById (id: string): Promise<UsuarioResponse>;
  getByUsername (username: string): Promise<UsuarioResponse>;
}
