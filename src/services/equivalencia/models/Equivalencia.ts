import type Item from "@/services/desplegables/models/Item";

export default interface Equivalencia {
  id: String;
  tmpId?: String;
  to: Item;
  factor: Number;
}
