export interface Reservation {
  id?: number;

  renter?: any;

  rentee?: any;

  startFrom?: string;

  endAt?: string;

  location?: string;

  reserveAt?: string;

  status?: any;

  totalMoney?: number;

  reservationDetails?: any[];
}
