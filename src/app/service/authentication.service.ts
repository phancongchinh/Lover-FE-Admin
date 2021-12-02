import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AUTH_API_URL} from '../api-urls';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../model/user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<UserToken>

  public currentUser: Observable<UserToken>

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('userToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<UserToken> {
    return this.httpClient.post(`${AUTH_API_URL}/login`, {username, password});
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
