import ImagenResponse from '@/services/commons/models/ImagenResponse';
import FotoRequest from '@/services/usuario/models/FotoRequest';
import PreferenciaResponse from '@/services/usuario/models/PreferenciaResponse';
import Usuario from '@/services/usuario/models/Usuario';
import UsuarioResponse from '@/services/usuario/models/UsuarioResponse';

export default interface UsuarioRepository {
	get(): Promise<UsuarioResponse>;
	getById(id: string): Promise<UsuarioResponse>;
	getByUsername(username: string): Promise<UsuarioResponse>;
	update(data: Usuario): Promise<UsuarioResponse>;
	getPreferencias(userId: string): Promise<PreferenciaResponse>;
	getFoto(request: FotoRequest): Promise<ImagenResponse>;
}
