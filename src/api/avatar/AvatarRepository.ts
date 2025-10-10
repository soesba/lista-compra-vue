import Avatar from '@/services/avatar/models/Avatar';
import AvatarResponse from '@/services/avatar/models/AvatarResponse';

export default interface AvatarRepository {
  get (): Promise<AvatarResponse>;
  getById (id: string): Promise<AvatarResponse>;
  getByNombre (username: string): Promise<AvatarResponse>;
  update (data: Avatar): Promise<AvatarResponse>;
}
