import AuthRepository from '../AuthRepository'

export default class AuthRepositoryImpl implements AuthRepository {
   isLoginApp(): boolean {
    return true
  }
}
