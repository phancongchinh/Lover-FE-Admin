import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {ROLE_ADMIN} from '../../model/constants';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  returnUrl: string;
  loading = false;
  submitted = false;
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      if (this.hasRole(ROLE_ADMIN)) {
        this.hasRoleAdmin = true;
      }
    }
    if (this.authenticationService.currentUserValue) {
      if (this.hasRoleAdmin) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  doLogin() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.doLogin(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('ACCESS_TOKEN', data.token);
          const roleList = data.roles;
          for (const role of roleList) {
            if (role.authority === ROLE_ADMIN) {
              this.returnUrl = '/admin/dashboard';
            }
          }
          this.router.navigate([this.returnUrl]).finally(() => {
          });
        });
  }

  hasRole(authority: string) {
    const roles = this.currentUser.roles;
    for (const role of roles) {
      if (role.authority === authority) {
        return true;
      }
    }
    return false;
  }
}
