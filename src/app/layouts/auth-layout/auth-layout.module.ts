import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegisterComponent } from '../../pages/register/register.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        SweetAlert2Module.forRoot(),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
    ],
    declarations: [ChangePasswordComponent, LoginComponent, RegisterComponent],
})
export class AuthLayoutModule {}
