import type Precio from "@/services/precio/models/Precio"

export default interface Articulo {
  id: string;
  nombre: string;
  descripcion: string;  
  tiposUnidad: {
    id: string;
    nombre: string;
  }[];
  precios: Precio[];
  fechaCreacion: string;
  borrable: boolean;
}