import AvatarRepositoryImpl from './AvatarRepositoryImpl'

export default {
  getInstance () {
    return new AvatarRepositoryImpl()
  }
}
