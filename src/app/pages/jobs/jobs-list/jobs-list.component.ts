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
    itemsPerPage = 10;
    page = 1;
    maxSize = 5;
    private unsubscribe$ = new Subject();
    constructor(private jobsService: JobsService) {}

    ngOnInit(): void {
        this.setJobs();
    }

    setJobs() {
        const paginationParams: PaginationParams = {
            page: this.page,
            per_page: this.itemsPerPage,
        };
        this.jobsService.getAllJobs(paginationParams).subscribe((resp) => {
            this.jobs = resp.data;
            this.meta = resp.meta;
        });
    }

    onPageChanged(page: INgxPaginationPage) {
        this.page = page.page;
        this.setJobs();
        console.log(page);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }
}