import AuthRepositoryImpl from './AuthRepositoryImpl'

export default {
  getInstance () {
    return new AuthRepositoryImpl()
  }
}
