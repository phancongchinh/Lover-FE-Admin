import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  userToken: UserToken = {};

  user: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.user = this.userForm.value;
    this.authenticationService.login(this.userForm.get('username').value, this.userForm.get('password').value).subscribe(data => {
      this.userToken = data;
      localStorage.setItem('userToken', JSON.stringify(this.userToken));
      const roles = this.userToken.roles;
      for (let i = 0; i < roles.length; i++) {
        if (roles.name === 'ROLE_ADMIN') {
          this.router.navigate(['admin']);
          return;
        }
      }
      this.router.navigate(['/buyer']);
    }, error => console.log(error.message));
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }
}
