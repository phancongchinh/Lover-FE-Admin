import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/user-token';
import {ROLE_ADMIN, ROLE_SELLER} from '../../model/constants';
import {API_URL} from '../../api-urls';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  apiUrl = API_URL;

  currentUser: UserToken;
  roleAdmin = ROLE_ADMIN;
  roleSeller = ROLE_SELLER;

  user: User = {};

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.findUserById();
  }

  hasRole(authority: string) {
    return this.authenticationService.hasRole(authority, this.currentUser);
  }

  doLogout() {
    this.authenticationService.doLogout();
  }

  findUserById() {
    this.userService.findById(this.currentUser.id).subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }
}
