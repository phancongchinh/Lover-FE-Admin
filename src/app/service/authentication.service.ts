import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AUTH_API_URL} from '../api-urls';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtResponse} from '../model/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<JwtResponse>;

  public currentUser: Observable<JwtResponse>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('userToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.httpClient.post(`${AUTH_API_URL}/login`, {username, password});
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
