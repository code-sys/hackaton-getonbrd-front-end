import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IJob, IMeta, PaginationParams, INgxPaginationPage } from '@core/interfaces';
import { JobsService } from '../../../services/jobs/jobs.service';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit, OnDestroy {
    jobs: IJob[];
    meta: IMeta;
    showBoundaryLinks = true;    
    maxSize = 5;
    private unsubscribe$ = new Subject();
    paginationParams: PaginationParams = {
        per_page: 10,
        page: 1,
        category: '',
    };
    constructor(private jobsService: JobsService) {}

    ngOnInit(): void {
        this.setJobs();
    }

    setJobs() {        
        this.jobsService.getAllJobs(this.paginationParams).subscribe({
            next: (resp) => {
                this.jobs = resp.data;
                this.meta = resp.meta;
            },
            error: (error) => {
                this.jobs = [];
                this.meta = {
                    page: 1,
                    per_page: 10,
                    total_pages: 0,
                };
            },
        });
    }

    onPageChanged(page: INgxPaginationPage) {
        this.paginationParams.page =  page.page;
        this.setJobs();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }

    filterCategoriesList(category: string){
        this.paginationParams.page = 1;
        this.paginationParams.category = category;//envio una categoria
        this.setJobs();
    }
}
