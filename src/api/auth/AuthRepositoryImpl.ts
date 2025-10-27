import { xhr } from '@/api/config/Repository'
import AuthRepository from './AuthRepository'
import LoginResponse from '@/services/auth/models/LoginResponse'
import LoginRequestDTO from './dto/LoginRequestDTO'
import LoginResponseDTO from './dto/LoginResponseDTO'

export default class AuthRepositoryImpl implements AuthRepository {
  /**
   * Servicio de autenticación
   * @param username: Nombre de usuario
   * @param password: Contraseña del usuario
   * @return Promise<Response>: Retorna el access token y el refresh token
   * @reject Promise<Error>: Retorna error cuando la autenticación no es correcta
   */
  async login(username: string, password: string): Promise<LoginResponse> {
    const endpoint = '/auth/login'
    const params: LoginRequestDTO = {
      username,
      password
    }
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }

    const response = await xhr.post<LoginRequestDTO, LoginResponseDTO>(endpoint, params, { headers })
    return {
      status: response.status,
      data: {
        access_token: response.data.token,
        refresh_token: response.data.refreshToken,
        usuario: response.data.user
      }
    }
  }

  /**
   * Servicio de refresco del token
   * @return Promise<Response>: Retorna el access token y el refresh token
   * @reject Promise<error>: Retorna error cuando la actualización no es correcta
   */
  async refresh(refreshToken: string): Promise<LoginResponse> {
    const endpoint = '/auth/refresh'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'x-refresh-token': refreshToken
    }

    const response = await xhr.get<LoginResponseDTO>(endpoint, { headers })
    return {
      status: response.status,
      data: {
        access_token: response.data.token,
        refresh_token: response.data.refreshToken,
        usuario: response.data.user
      }
    }
  }
}
