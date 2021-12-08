import {User} from './user';

export interface Reservation {
  id?: number;
  renter?: User;
  rentee?: User;
  startFrom?: any;
  endAt?: any;
  location?: any;
  reserveAt?: any;
  status?: string;
  totalMoney: number;
}
