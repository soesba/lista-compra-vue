export default interface TipoEstablecimientoDTO {
  id: string;
  nombre: string;
  abreviatura: string;
  fechaCreacion: Date;
  borrable: boolean;
  esMaestro: boolean;
}
