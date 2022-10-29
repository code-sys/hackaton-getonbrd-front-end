import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [JobsListComponent],
    imports: [CommonModule, JobsRoutingModule, PaginationModule.forRoot(), NgxPaginationModule],
})
export class JobsModule {}
