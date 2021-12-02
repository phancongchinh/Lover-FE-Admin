import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent
  },
  {
    path: 'admin/users',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
