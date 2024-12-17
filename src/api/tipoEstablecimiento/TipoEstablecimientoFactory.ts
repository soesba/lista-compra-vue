import TipoEstablecimientoRepositoryImpl from "./TipoEstablecimientoRepositoryImpl"

export default {
	getInstance () {
		return new TipoEstablecimientoRepositoryImpl()
	}
}
