import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/user-token';
import {ROLE_ADMIN, ROLE_SELLER} from '../../model/constants';
import {User} from '../../model/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUser: UserToken;
  roleAdmin = ROLE_ADMIN;
  roleSeller = ROLE_SELLER;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }

  hasRole(authority: string) {
    return this.authenticationService.hasRole(authority, this.currentUser);
  }

  doLogout() {
    this.authenticationService.doLogout();
  }
}
