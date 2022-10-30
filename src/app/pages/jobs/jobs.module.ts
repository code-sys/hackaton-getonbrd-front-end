import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared.module';
import { JobsListCardsComponent } from './jobs-list-cards/jobs-list-cards.component';

@NgModule({
    declarations: [JobsListComponent, JobsListCardsComponent],
    imports: [
        CommonModule,
        JobsRoutingModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        SharedModule,
        TabsModule.forRoot(),
    ],
})
export class JobsModule {}
