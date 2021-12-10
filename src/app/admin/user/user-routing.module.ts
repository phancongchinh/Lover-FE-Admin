import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserServiceComponent} from './user-service/user-service.component';
import {UserImageComponent} from './user-image/user-image.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: ':id',
    component: UserEditComponent
  },
  {
    path: ':id/services',
    component: UserServiceComponent
  },
  {
    path: ':id/gallery',
    component: UserImageComponent
  },
  {
    path: ':id/reservations',
    loadChildren: () => import('./user-reservation/user-reservation.module').then(module => module.UserReservationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
