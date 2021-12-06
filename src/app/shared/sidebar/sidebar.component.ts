import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/user-token';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUserValue: UserToken;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUserValue = this.authenticationService.currentUserValue;
  }

  doLogout() {
    this.authenticationService.doLogout();
  }


}
