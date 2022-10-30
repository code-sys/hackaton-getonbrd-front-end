import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ComponentsModule } from 'src/app/components/components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';

@NgModule({
    declarations: [JobsListComponent,JobsDetailComponent],
    imports: [
        CommonModule,
        JobsRoutingModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        ComponentsModule,
        TabsModule.forRoot(),
    ],
})
export class JobsModule {}
