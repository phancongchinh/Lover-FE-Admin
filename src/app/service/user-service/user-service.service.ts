import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {USER_SERVICE_API_URL} from '../../api-urls';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../model/user-service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<UserService[]> {
    return this.httpClient.get<UserService[]>(USER_SERVICE_API_URL);
  }

  findBySeller(sellerId: number): Observable<UserService[]> {
    return this.httpClient.get<UserService[]>(USER_SERVICE_API_URL + `?sellerId=${sellerId}`);
  }

  addNew(userService: UserService): Observable<UserService> {
    return this.httpClient.post<UserService>(USER_SERVICE_API_URL, userService);
  }

  addManyNew(userServices: UserService[]): Observable<UserService[]> {
    return this.httpClient.post<UserService[]>(USER_SERVICE_API_URL, userServices);
  }

  edit(userService: UserService, id: number): Observable<UserService> {
    return this.httpClient.put<UserService>(USER_SERVICE_API_URL + `/${id}`, userService);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(USER_SERVICE_API_URL + `/${id}`);
  }
}
