import type UsuarioDTO from "./UsuarioDTO"

export default interface UsuariosResponseDTO {
  respuesta: number;
  data: UsuarioDTO[];
}
