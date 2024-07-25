export default interface CompraRequestDTO {
  id: string;
  totalCompra: number;
  articulos: Array<any>;
  establecimiento: {
    id: string;
    nombre: string;
  };
  fechaCompra: string;
  fechaCreacion: string;
  notas: string;
  borrable: boolean;
}