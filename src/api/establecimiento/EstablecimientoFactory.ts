import EstablecimientoRepositoryImpl from "./EstablecimientoRepositoryImpl"

export default {
  getInstance () {
    return new EstablecimientoRepositoryImpl()
  }
}
