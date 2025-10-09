import type UsuarioDTO from "./UsuarioDTO"

export default interface UsuarioResponseDTO {
	respuesta: number;
	data: UsuarioDTO;
}
