export default interface LoginResponse {
  status: number;
  data: {
    access_token: string;
    refresh_token: string;
    username: string;
  };
}
