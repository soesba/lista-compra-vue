import Configuracion from '@/services/configuracion/models/Configuracion';
import ConfiguracionDTO from '../dto/ConfiguracionDTO';

export const DtoToModel = (dto: ConfiguracionDTO): Configuracion => {
  const model: Configuracion = {
    id: dto.id,
    categoria: dto.categoria,
    nombre: dto.nombre,
    texto: dto.texto ? dto.texto : '',
    valores: dto.valores ? dto.valores : [],
    valorDefecto: dto.valorDefecto
  }
  return model
}

export const ModelToDto = (model: Configuracion): ConfiguracionDTO => {
  const dto: ConfiguracionDTO = {
    id: model.id,
    categoria: model.categoria,
    nombre: model.nombre,
    texto: model.texto ? model.texto : '',
    valores: model.valores ? model.valores : [],
    valorDefecto: model.valorDefecto
  }
  return dto;
}
