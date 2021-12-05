import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {ROLE_ADMIN} from '../../model/constants';
import {first} from 'rxjs/operators';
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  returnUrl: string;
  loading = false;
  submitted = false;
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
    if (this.currentUser) {
      const roles = this.currentUser.roles;
      for (const role of roles) {
        if (role.authority === ROLE_ADMIN) {
          this.hasRoleAdmin = true;
        }
      }
    }
    if (this.authenticationService.currentUserValue) {
      if (this.hasRoleAdmin) {
        this.router.navigate(['admin/dashboard']).then();
      } else {
        this.router.navigate(['/']).then();
      }
    }
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';

    $(document).ready(() => {
      $('#').validate({
        rules: {
          username: {required: true},
          password: {required: true}
        },
        messages: {
          email: {
            required: 'Enter username'
          },
          fullName: {
            required: 'Enter password'
          },
        },
        errorElement: 'span',
        errorPlacement: (error, element) => {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: (element, errorClass, validClass) => {
          $(element).addClass('is-invalid');
        },
        unhighlight: (element, errorClass, validClass) => {
          $(element).removeClass('is-invalid');
        }
      });
    });
  }

  doLogin() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.doLogin(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe((data) => {
        localStorage.setItem('ACCESS_TOKEN', data.accessToken);
        const roles = data.roles;
        for (const role of roles) {
          if (role.authority === ROLE_ADMIN) {
            this.returnUrl = '/admin/dashboard';
          }
        }
        this.router.navigate([this.returnUrl]).finally(() => {
        });

        $(() => {
          this.notificationService.notify('success', 'Logged in successfully');
        }, () => {
          this.notificationService.notify('error', 'Logged in failed');
        });
      });
  }
}
