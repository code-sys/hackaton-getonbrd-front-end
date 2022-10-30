import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRouter } from './home.routing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        SharedModule,
        RouterModule.forChild(HomeRouter),
    ],
})
export class HomeModule {}
