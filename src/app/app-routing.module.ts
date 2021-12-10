import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './helper/auth-guard';
import {LayoutWithSharedComponent} from './layout/layout-with-shared/layout-with-shared.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'admin',
    component: LayoutWithSharedComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
