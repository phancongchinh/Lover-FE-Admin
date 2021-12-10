import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../model/user-token';
import {AUTH_API_URL} from '../api-urls';
import {map} from 'rxjs/operators';
import {Route, Router} from '@angular/router';
import {NotificationService} from './notification/notification.service';
import {ROLE_ADMIN, ROLE_SELLER} from '../model/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  update = new EventEmitter<string>();

  userToken: UserToken = {};

  constructor(private httpClient: HttpClient,
              private router: Router,
              private notificationService: NotificationService) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('userToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    this.httpClient.post(`${AUTH_API_URL}/login`, {username, password})
      .subscribe(data => {
        this.userToken = data;
        localStorage.setItem('userToken', JSON.stringify(this.userToken));
        this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('userToken')));
        this.currentUser = this.currentUserSubject.asObservable();
        if (this.currentUser) {
          if (this.hasRole(ROLE_ADMIN, this.userToken) || this.hasRole(ROLE_SELLER, this.userToken)) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.notificationService.notify('error', 'You do not have permission to login');
          }
        }
      }, error => this.notificationService.notify('error', 'Incorrect account or password'));
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
