import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../model/user-token';
import {AUTH_API_URL} from '../api-urls';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  update = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('userToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  doLogin(username: string, password: string): Observable<UserToken> {
    return this.httpClient.post<any>(`${AUTH_API_URL}/login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('userToken', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.update.emit('login');
        return user;
      }));
  }

  doLogout() {
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
  }

  hasRole(authority: string, userToken?: UserToken) {
    const roles = userToken.roles;
    for (const role of roles) {
      if (role.authority === authority) {
        return true;
      }
    }
    return false;
  }
}
