import Configuracion from '@/services/configuracion/models/Configuracion';
import ConfiguracionRepository from './ConfiguracionRepository';
import ConfiguracionResponse from '@/services/configuracion/models/ConfiguracionResponse';
import { xhr } from '../config/Repository';
import ConfiguracionDTO from './dto/ConfiguracionDTO';
import { DtoToModel } from './mapping/ConfiguracionMapping';
import ConfiguracionResponseDTO from './dto/ConfiguracionResponseDTO';
import ConfiguracionesResponseDTO from './dto/ConfiguracionesResponseDTO';

export default class ConfiguracionRepositoryImpl implements ConfiguracionRepository {
  async getConfiguraciones(): Promise<ConfiguracionResponse> {
    const endpoint = '/api/configuracion'
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<ConfiguracionesResponseDTO>(endpoint, { headers })
		const result = {
			data: response.data.data.map((item: Configuracion) => DtoToModel(item)),
			respuesta: response.status
		}
		return result
  }

  async getConfiguracionById(id: string): Promise<ConfiguracionResponse> {
    const endpoint = `/api/configuracion?id=${id}`
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		const response = await xhr.get<ConfiguracionResponseDTO>(endpoint, { headers })
		const result = {
			data: DtoToModel(response.data.data as ConfiguracionDTO),
			respuesta: response.status
		}
		return result

  }

  async getConfiguracionesByCategoria(categoria: string): Promise<ConfiguracionResponse> {
    const endpoint = `/api/configuracion?categoria=${categoria}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ConfiguracionesResponseDTO>(endpoint, { headers })
    const result = {
      data: (response.data.data).map((item: Configuracion) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }

  async getConfiguracionesByUsuarioId(usuarioId: string): Promise<ConfiguracionResponse> {
    const endpoint = `/api/configuracion?usuarioId=${usuarioId}`
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await xhr.get<ConfiguracionesResponseDTO>(endpoint, { headers })
    const result = {
      data: (response.data.data).map((item: Configuracion) => DtoToModel(item)),
      respuesta: response.status
    }
    return result
  }
}
