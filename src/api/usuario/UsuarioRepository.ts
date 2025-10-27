import PreferenciaResponse from '@/services/usuario/models/PreferenciaResponse';
import Usuario from '@/services/usuario/models/Usuario';
import UsuarioResponse from '@/services/usuario/models/UsuarioResponse';

export default interface UsuarioRepository {
  get(): Promise<UsuarioResponse>;
  getById(id: string): Promise<UsuarioResponse>;
  getByUsername(username: string): Promise<UsuarioResponse>;
  update(data: Usuario): Promise<UsuarioResponse>;
  getPreferencias(userId: string): Promise<PreferenciaResponse>;
}
