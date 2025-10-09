export default interface PermisoDTO {
  id: string;
  modeloId: string;
  acceso: boolean;
  permiso: Array<string>;
}
