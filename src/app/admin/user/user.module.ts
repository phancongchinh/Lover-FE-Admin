import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserServiceComponent} from './user-service/user-service.component';
import {UserImageComponent} from './user-image/user-image.component';
import { UserReservationComponent } from './user-reservation/user-reservation.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserServiceComponent,
    UserImageComponent,
    UserReservationComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule {
}
