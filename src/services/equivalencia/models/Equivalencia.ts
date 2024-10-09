import type Item from "@/services/desplegables/models/Item";

export default interface Equivalencia {
  id: string;
  tmpId?: string;
  from: Item;
  to: Item;
  factor: Number;
  fechaCreacion: string;
  borrable: boolean;
}
