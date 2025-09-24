export default interface AuthRepository {
  login (username: string, password: string): Promise<any>;
  refresh (refreshToken: string): Promise<any>;
  // resetPassword (userId: string): Promise<any>;
  // changePassword(userId: string, oldPassword: string, newPassword: string): Promise<any>;
}
