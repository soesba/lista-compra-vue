import CompraRepositoryImpl from "./CompraRepositoryImpl"

export default {
  getInstance () {
    return new CompraRepositoryImpl()
  }
}
