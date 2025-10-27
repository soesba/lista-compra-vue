import Avatar from '@/services/avatar/models/Avatar';
import AvatarResponse from '@/services/avatar/models/AvatarResponse';

export default interface AvatarRepository {
  get (): Promise<AvatarResponse>;
  getById (id: string): Promise<AvatarResponse>;
  insert (data: Avatar): Promise<AvatarResponse>;
  delete(id: string): Promise<AvatarResponse>;
}
