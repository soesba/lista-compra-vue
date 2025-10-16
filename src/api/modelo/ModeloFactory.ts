import ModeloRepositoryImpl from './ModeloRepositoryImpl'

export default {
  getInstance () {
    return new ModeloRepositoryImpl()
  }
}
