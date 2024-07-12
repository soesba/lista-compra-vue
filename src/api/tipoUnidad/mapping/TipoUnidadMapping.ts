import type TipoUnidad from "@/services/tipoUnidad/models/TipoUnidad";
import type TipoUnidadDTO from "../dto/TipoUnidadDTO";

export const DTOtoModel = (origin: TipoUnidadDTO): TipoUnidad => {
  return {...origin}
}