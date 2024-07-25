export default interface Articulo {
  id: string;
  nombre: string;
  descripcion: string;  
  tiposUnidad: {
    id: string;
    nombre: string;
  }[];
  fechaCreacion: string;
  borrable: boolean;
}