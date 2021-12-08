import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../../../service/reservation/reservation.service';
import {Reservation} from '../../../model/reservation';
import {User} from '../../../model/user';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[];

  renter: User;

  rentee: User;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.getAllReservations();
  }

  private getAllReservations() {
    this.reservationService.findAll().subscribe((data) => {
      this.reservations = data;
    }, (error) => {
      console.log(error);
    });
  }
}
