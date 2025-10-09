import Usuario from './Usuario';

export default interface UsuarioResponse {
  respuesta: number;
  data: Usuario | Usuario[];
}
