import {Injectable} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      });
    }
    return next.handle(httpRequest);
  }
}
