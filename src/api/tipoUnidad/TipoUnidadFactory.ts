import TipoUnidadRepositoryImpl from "./TipoUnidadRepositoryImpl"

export default {
  getInstance () {
    return new TipoUnidadRepositoryImpl()
  }
}
