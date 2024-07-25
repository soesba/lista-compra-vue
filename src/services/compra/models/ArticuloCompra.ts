import type Articulo from "@/services/articulo/models/Articulo";

export default interface ArticuloCompra {
  articulo: Articulo;
  cantidad: number;
  precioUnitario: number;
  unidadesMedida: Array<{
    id: string;
    nombre: string;
    valor: number | null;
  }>
}