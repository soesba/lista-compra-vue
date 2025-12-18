import Usuario from './Usuario';

export default interface UsuarioDeleteResponse {
  respuesta: number;
  data: {
    result: Usuario;
    resultDeletePrecio: number;
    resultDeleteArticulo: number;
    resultUpdateTipoUnidad: number;
    resultDeleteTipoUnidad: number;
    resultEstablecimiento: number;
    resultUpdateTipoEstablecimiento: number;
    resultDeleteTipoEstablecimiento: number;
  };
}