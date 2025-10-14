import Usuario from '@/services/usuario/models/Usuario'
import UsuarioDTO from '../dto/UsuarioDTO'
import PermisoDTO from '../dto/PermisoDTO'
import Permiso from '@/services/auth/models/Permiso'

export const DtoToModel = (dto: UsuarioDTO): Usuario => {
  return {
    id: dto.id,
    username: dto.username,
    nombre: dto.nombre,
    primerApellido: dto.primerApellido ? dto.primerApellido : '',
    segundoApellido: dto.segundoApellido ? dto.segundoApellido : '',
    email: dto.email ? dto.email : '',
    foto: dto.foto,
    fechaCreacion: dto.fechaCreacion,
    esAdministrador: dto.esAdministrador,
    permisos: dto.permisos ? dto.permisos.map((permisoDTO: PermisoDTO) => ({
      id: permisoDTO.id,
      modeloId: permisoDTO.modeloId,
      acceso: permisoDTO.acceso,
      permiso: permisoDTO.permiso
    })) : []
  }
}

export const ModelToDto = (model: Usuario): UsuarioDTO => {
  return {
    id: model.id,
    username: model.username,
    nombre: model.nombre,
    primerApellido: model.primerApellido,
    segundoApellido: model.segundoApellido,
    email: model.email ? model.email : '',
    foto: model.foto ? model.foto : null,
    fechaCreacion: model.fechaCreacion,
    esAdministrador: model.esAdministrador,
    permisos: model.permisos ? model.permisos.map((permiso: Permiso) => ({
      id: permiso.id,
      modeloId: permiso.modeloId,
      acceso: permiso.acceso,
      permiso: permiso.permiso
    })) : []
  }
}
