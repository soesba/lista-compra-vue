import UsuarioRepositoryImpl from './UsuarioRepositoryImpl'

export default {
  getInstance () {
    return new UsuarioRepositoryImpl()
  }
}
