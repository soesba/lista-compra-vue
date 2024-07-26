import PrecioRepositoryImpl from "./PrecioRepositoryImpl"

export default {
  getInstance () {
    return new PrecioRepositoryImpl()
  }
}
