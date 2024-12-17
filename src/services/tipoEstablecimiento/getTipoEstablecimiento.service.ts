import API from "@/api"
import type TipoEstablecimientoResponse from "./models/TipoEstablecimientoResponse"

const get = async (): Promise<TipoEstablecimientoResponse> => {
	return await API.TipoEstablecimientoRepository.get()
}

export default get
