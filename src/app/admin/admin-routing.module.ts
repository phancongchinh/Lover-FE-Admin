import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import('./user/user-reservation/user-reservation-routing.module').then(module => module.UserReservationRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
