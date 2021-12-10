import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserReservationRoutingModule} from './user-reservation-routing.module';
import {UserReservationListComponent} from './user-reservation-list/user-reservation-list.component';
import {UserReservationViewComponent} from './user-reservation-view/user-reservation-view.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [UserReservationListComponent, UserReservationViewComponent],
  imports: [
    CommonModule,
    UserReservationRoutingModule,
    FormsModule
  ]
})
export class UserReservationModule {
}
