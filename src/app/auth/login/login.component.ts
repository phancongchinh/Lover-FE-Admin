import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {ROLE_ADMIN, ROLE_SELLER} from '../../model/constants';
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

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);

    if (this.currentUser) {
      if (this.authenticationService.hasRole(ROLE_ADMIN) || this.authenticationService.hasRole(ROLE_SELLER)) {
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
      .subscribe((data) => {
        if (this.authenticationService.hasRole(ROLE_ADMIN, data) || this.authenticationService.hasRole(ROLE_SELLER, data)) {
          this.returnUrl = '/admin/dashboard';
        } else {
          this.returnUrl = '/';
        }
        this.router.navigate([this.returnUrl]).finally(() => {
        });
      });
  }
}
