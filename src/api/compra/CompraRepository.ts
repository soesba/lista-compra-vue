import type CompraRequest from "@/services/compra/models/CompraRequest"
import type CompraResponse from "@/services/compra/models/CompraResponse"

export default interface CompraRepository {
  get(): Promise<CompraResponse>;
  getById(id: string): Promise<CompraResponse>;
  getByAny(request: string): Promise<CompraResponse>;
  insert(request: CompraRequest): Promise<CompraResponse>;
  update(request: CompraRequest): Promise<CompraResponse>;
  delete(id: string): Promise<CompraResponse>;
}