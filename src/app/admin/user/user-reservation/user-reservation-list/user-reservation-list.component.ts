import {Component, OnInit} from '@angular/core';
import {Reservation} from '../../../../model/reservation';
import {ReservationService} from '../../../../service/reservation/reservation.service';
import {AuthenticationService} from '../../../../service/authentication.service';
import {UserToken} from '../../../../model/user-token';

@Component({
  selector: 'app-user-reservation-list',
  templateUrl: './user-reservation-list.component.html',
  styleUrls: ['./user-reservation-list.component.css']
})
export class UserReservationListComponent implements OnInit {

  myReservations: Reservation[];

  currentUser: UserToken;

  constructor(private reservationService: ReservationService,
              private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.getMyReservations();
  }

  getMyReservations() {
    const user = {id: this.currentUser.id};
    this.reservationService.findByRentee(user).subscribe((data) => {
      this.myReservations = data;
    }, (error) => {
      console.log(error);
    });
  }

}
