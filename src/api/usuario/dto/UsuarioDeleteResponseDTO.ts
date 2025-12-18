import UsuarioDTO from './UsuarioDTO';

export default interface UsuarioDeleteResponseDTO {
  respuesta: number;
  data: {
    result: UsuarioDTO;
    resultDeletePrecio: number;
    resultDeleteArticulo: number;
    resultUpdateTipoUnidad: number;
    resultDeleteTipoUnidad: number;
    resultEstablecimiento: number;
    resultUpdateTipoEstablecimiento: number;
    resultDeleteTipoEstablecimiento: number;
  };
}