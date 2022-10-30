import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { IJob, IMeta, PaginationParams, INgxPaginationPage, IChangeSearch } from '@core/interfaces';
import { JobsService } from '../../../services/jobs/jobs.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SearchJobsService } from '../../../services/search-jobs/search-jobs.service';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit, OnDestroy {
    jobs: IJob[];
    meta: IMeta;
    interval;
    showModalDetail: boolean = false;
    showBoundaryLinks: boolean = true;
    maxSize: number = 5;
    jobSelected: IJob;
    private unsubscribe$ = new Subject();
    @ViewChild('modalJobDetail', { static: false })
    readonly modalJobDetail: ModalDirective;
    paginationParams: PaginationParams = {
        per_page: 10,
        page: 1,
        category: '',
    };

    constructor(private jobsService: JobsService, private searchJobs: SearchJobsService) {}

    ngOnInit(): void {
        this.setJobs();
    }

    setJobs() {
        this.jobsService.getAllJobs(this.paginationParams).subscribe({
            next: (resp) => {
                this.jobs = resp.data;
                this.meta = resp.meta;
            },
            error: (_error) => {
                this.jobs = [];
                this.meta = {
                    page: 1,
                    per_page: 10,
                    total_pages: 0,
                };
            },
        });
    }

    searchJobsWihAWord(word: string) {
        this.searchJobs.searchJobs(this.paginationParams, word).subscribe({
            next: (resp) => {
                this.jobs = resp.data;
                this.meta = resp.meta;
            },
            error: (_error) => {
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
        this.paginationParams.page = page.page;
        this.setJobs();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }

    filterCategoriesList(category: string) {
        this.paginationParams.page = 1;
        this.paginationParams.category = category; //send a category
        this.setJobs();
    }

    showDetail(job: IJob) {
        this.jobSelected = job;
        this.showModalDetail = true;
        this.modalJobDetail.show();
    }

    onSearchJob(word: string) {
        this.paginationParams.page = 1;
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(async () => {
            if (!word) {
                this.setJobs();
            } else {
                this.searchJobsWihAWord(word);
            }
            clearTimeout(this.interval);
        }, 500);
    }
}
