import type EstablecimientoDTO from "@/api/establecimiento/dto/EstablecimientoDTO"

export default interface CompraDTO {
  id: string;
  totalCompra: number;
  factura: string;
  articulos: Array<any>;
  establecimiento: EstablecimientoDTO;
  fechaCompra: string;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}