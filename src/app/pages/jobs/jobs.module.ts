import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    declarations: [JobsListComponent],
    imports: [
        CommonModule,
        JobsRoutingModule,
        TooltipModule.forRoot(),
        PaginationModule.forRoot(),
    ],
})
export class JobsModule {}
