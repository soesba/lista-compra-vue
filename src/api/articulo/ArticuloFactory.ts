import ArticuloRepositoryImpl from "./ArticuloRepositoryImpl"

export default {
  getInstance () {
    return new ArticuloRepositoryImpl()
  }
}
