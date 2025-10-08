import UserInfoDTO from './UserInfoDTO'

export default interface LoginResponseDTO {
  token: string;
  refreshToken: string;
  user: UserInfoDTO;
}
