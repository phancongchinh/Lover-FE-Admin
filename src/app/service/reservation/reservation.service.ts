import {Injectable} from '@angular/core';
import {Reservation} from '../../model/reservation';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RESERVATION_API_URL} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[];

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(RESERVATION_API_URL);
  }

  findById(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(RESERVATION_API_URL + `/view/${id}`);
  }

  addNew(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(RESERVATION_API_URL, reservation);
  }

  edit(reservation: Reservation, id: number): Observable<Reservation> {
    return this.httpClient.put<Reservation>(RESERVATION_API_URL + `/${id}`, reservation);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(RESERVATION_API_URL + `/${id}`);
  }
}
