import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';


@NgModule({
    declarations: [LoginComponent, PasswordRecoverComponent],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
