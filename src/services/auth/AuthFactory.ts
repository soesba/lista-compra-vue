import AuthRepositoryImpl from './impl/AuthRepositoryImpl'

export default {
  getInstance () {
    return new AuthRepositoryImpl()
  }
}
