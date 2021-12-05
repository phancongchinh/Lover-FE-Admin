import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AUTH_API_URL} from '../api-urls';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../model/user-token';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  update = new EventEmitter<string>();

  constructor(private httpClient: HttpClient,
              private router: Router) {
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
    this.router.navigateByUrl(`${AUTH_API_URL}/login`).then();
  }


}
