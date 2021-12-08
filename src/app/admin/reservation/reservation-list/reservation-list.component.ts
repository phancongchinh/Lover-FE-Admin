import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../service/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import {error} from 'protractor';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[];

  constructor(private reservationService: ReservationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllReservations();
  }

  findAllReservation(arg0: number) {
    throw new Error("Method not implemented.");
  }
  private getAllReservations() {
    this.reservationService.findAll().subscribe((data) => {
      this.reservations = data;
    }, (error) => {
      console.log(error.name);
    });
  }

  showView(id: any) {
    this.router.navigate([`/reservation-view/${id}`]);
  }

}
