import type ItemDTO from "@/api/desplegables/dto/ItemDTO"

export default interface EquivalenciaDTO {
  id: string;
  from: ItemDTO;
  to: ItemDTO;
  factor: Number;
  fechaCreacion: string;
  borrable: boolean;
}
