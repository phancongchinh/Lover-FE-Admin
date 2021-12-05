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
    path: 'edit/:id',
    component: UserEditComponent
  },
  {
    path: 'edit/:id/services',
    component: UserServiceComponent
  },
  {
    path: 'edit/:id/gallery',
    component: UserImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}