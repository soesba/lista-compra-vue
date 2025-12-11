export default interface AuthRepository {
  login (username: string, password: string): Promise<any>;
  refresh (refreshToken: string): Promise<any>;
  changePassword(username: string, newPassword: string): Promise<any>;
  register(username: string, email: string, password: string): Promise<any>;
}
