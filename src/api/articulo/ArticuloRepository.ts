import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"
import type ArticuloResponse from "@/services/articulo/models/ArticuloResponse"

export default interface ArticuloRepository {
  get(): Promise<ArticuloResponse>;
  getById(id: string): Promise<ArticuloResponse>;
  getByAny(request: string): Promise<ArticuloResponse>;
  insert(request: ArticuloRequest): Promise<ArticuloResponse>;
  update(request: ArticuloRequest): Promise<ArticuloResponse>;
  delete(id: string): Promise<ArticuloResponse>;
}