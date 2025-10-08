import UserInfo from '@/services/auth/models/UserInfo';

export default interface AuthState {
  token: string,
  refresh_token: string,
  usuario: UserInfo,
  isRefreshing: boolean,
  failedQueue: any[]
}
