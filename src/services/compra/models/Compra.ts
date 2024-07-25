import type ArticuloCompra from "./ArticuloCompra";

export default interface Compra {
  id: string;
  totalCompra: number;
  factura: string;
  articulos: Array<ArticuloCompra>;
  establecimiento: {
    id: string;
    nombre: string;
  } | null;
  fechaCompra: string;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}