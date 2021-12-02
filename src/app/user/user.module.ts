import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [UserListComponent, UserCreateComponent, UserEditComponent, UserViewComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule
    ]
})
export class UserModule { }
