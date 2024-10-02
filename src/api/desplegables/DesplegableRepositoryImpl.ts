import type ItemResponse from "@/services/desplegables/models/ItemResponse"
import type DesplegableRepository from "./DesplegableRepository";
import { xhr } from "../config/Repository";

enum TipoDato {
	Articulo = "articulo",
	Establecimiento = "establecimiento",
	TipoEstablecimiento = "tipoEstablecimiento",
  TipoUnidad = "tipoUnidad"
}

export default class DesplegableRepositoryImpl implements DesplegableRepository {
  async get (tipoDato: string): Promise<ItemResponse> {
    const endpoint = `/${TipoDato[tipoDato]}/getDesplegable`
    console.log("🚀 ~ DesplegableRepositoryImpl ~ get ~ endpoint:", endpoint)
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get(endpoint, { headers})
    const result = {
      data: response.data,
      respuesta: response.status
    }
    return result
  }
}