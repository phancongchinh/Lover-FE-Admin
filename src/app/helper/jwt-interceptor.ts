import {Injectable} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currenUser = this.authenticationService.currentUserValue;
    if (currenUser && currenUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: currenUser.token
        }
      });
    }
    return next.handle(req);
  }
}
