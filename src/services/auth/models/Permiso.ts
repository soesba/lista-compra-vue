export default interface Permiso {
  id: string;
  modeloId: string;
  acceso: boolean;
  permiso: Array<string>;
}
