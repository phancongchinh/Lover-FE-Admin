import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/user-token';
import {ROLE_ADMIN, ROLE_SELLER} from '../../model/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUserValue: UserToken;

  roleAdmin = ROLE_ADMIN;

  roleSeller = ROLE_SELLER;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUserValue = this.authenticationService.currentUserValue;
  }

  hasRole(authority: string): boolean {
    const roles = this.currentUserValue.roles;
    for (const role of roles) {
      if (role.authority === authority) {
        return true;
      }
    }
    return false;
  }

  doLogout() {
    this.authenticationService.doLogout();
  }
}
