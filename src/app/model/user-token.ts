import {Role} from './role';

export class UserToken {
  id?: number;
  username?: string;
  type = 'Bearer ';
  accessToken?: string;
  roles?: Role[];
}
