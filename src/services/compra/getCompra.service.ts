import API from "@/api"
import type CompraResponse from "./models/CompraResponse"

const get = async (): Promise<CompraResponse> => {
  return await API.CompraRepository.get()
}

export default get
