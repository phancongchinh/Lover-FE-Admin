import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserReservationListComponent} from './user-reservation-list/user-reservation-list.component';
import {UserReservationViewComponent} from './user-reservation-view/user-reservation-view.component';


const routes: Routes = [
  {
    path: '',
    component: UserReservationListComponent
  },
  {
    path: '/:id',
    component: UserReservationViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserReservationRoutingModule {
}
