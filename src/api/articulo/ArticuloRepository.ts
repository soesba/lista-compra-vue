import type ArticuloRequest from "@/services/articulo/models/ArticuloRequest"
import type ArticuloResponse from "@/services/articulo/models/ArticuloResponse"
import CheckDataResponse from '../commons/CheckDataResponse';

export default interface ArticuloRepository {
  get(): Promise<ArticuloResponse>;
  getById(id: string): Promise<ArticuloResponse>;
  search(request: string): Promise<ArticuloResponse>;
  insert(request: ArticuloRequest): Promise<ArticuloResponse>;
  update(request: ArticuloRequest): Promise<ArticuloResponse>;
  delete(id: string): Promise<ArticuloResponse>;
  checkData(): Promise<CheckDataResponse>;
}
