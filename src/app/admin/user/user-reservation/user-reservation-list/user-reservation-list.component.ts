import {Component, OnInit} from '@angular/core';
import {Reservation} from '../../../../model/reservation';
import {ReservationService} from '../../../../service/reservation/reservation.service';
import {AuthenticationService} from '../../../../service/authentication.service';
import {UserToken} from '../../../../model/user-token';
import {ACCEPTED, COMPLETED, PENDING, REJECTED} from '../../../../model/constants';
import {NotificationService} from '../../../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-user-reservation-list',
  templateUrl: './user-reservation-list.component.html',
  styleUrls: ['./user-reservation-list.component.css']
})
export class UserReservationListComponent implements OnInit {

  myReservations: Reservation[];

  currentUser: UserToken;

  reservationIdOnAction: number;

  PENDING = PENDING;
  ACCEPTED = ACCEPTED;
  REJECTED = REJECTED;
  COMPLETED = COMPLETED;

  constructor(private reservationService: ReservationService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.getMyReservations();
  }

  getMyReservations() {
    this.reservationService.findAll(this.currentUser.id).subscribe((data) => {
      this.myReservations = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  getReservationIdOnAction(id: number) {
    this.reservationIdOnAction = id;
  }

  accept(id: number) {
    this.reservationService.findById(id).subscribe((reservation) => {
      reservation.status = ACCEPTED;
      $('#modal-accept').modal('toggle');
      this.reservationService.edit(reservation, id).subscribe(() => {
        this.getMyReservations();
        this.notificationService.notify('success', 'Reservation accepted successfully!');
      }, (error) => {
        console.log(error);
        this.notificationService.notify('error', 'Reservation accepted failed!');
      });
    });
  }

  reject(id: number) {
    this.reservationService.findById(id).subscribe((reservation) => {
      reservation.status = REJECTED;
      $('#modal-reject').modal('toggle');
      this.reservationService.edit(reservation, id).subscribe(() => {
        this.getMyReservations();
        this.notificationService.notify('success', 'Reservation rejected successfully!');
      }, (error) => {
        console.log(error);
        this.notificationService.notify('error', 'Reservation rejected failed!');
      });
    });
  }

  claimMoney(id: number) {
    this.reservationService.findById(id).subscribe((reservation) => {
      reservation.status = COMPLETED;
      $('#modal-claim-money').modal('toggle');
      this.reservationService.edit(reservation, id).subscribe(() => {
        this.getMyReservations();
        this.notificationService.notify('success', 'Reservation accepted!');
      }, (error) => {
        console.log(error);
        this.notificationService.notify('error', 'Reservation rejected failed!');
      });
    });
  }
}
