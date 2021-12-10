import {Component, OnInit} from '@angular/core';
import {Reservation} from '../../../../model/reservation';
import {ReservationService} from '../../../../service/reservation/reservation.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../../../service/user/user.service";


@Component({
  selector: 'app-user-reservation-view',
  templateUrl: './user-reservation-view.component.html',
  styleUrls: ['./user-reservation-view.component.css']
})
export class UserReservationViewComponent implements OnInit {

  reservation: Reservation;

  constructor(private reservationService: ReservationService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      let id = param.get('id');
      this.findById(id);
    });
  }

  private findById(id: any) {
    this.reservationService.findById(id).subscribe(data => {
      this.reservation = data;
    }, error => console.log(error.message));
  }
}
