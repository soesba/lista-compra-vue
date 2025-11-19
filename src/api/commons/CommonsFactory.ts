import CommonsRepositoryImpl from './CommonsRepositoryImpl'

export default {
  getInstance() {
    return new CommonsRepositoryImpl()
  }
}