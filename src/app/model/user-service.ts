import {User} from './user';
import {Service} from './service';

export interface UserService {
  id?: number;
  user?: User;
  service?: Service;
  price?: number;
}
