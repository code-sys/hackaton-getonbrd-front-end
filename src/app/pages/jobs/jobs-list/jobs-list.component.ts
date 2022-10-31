import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IJob, IMeta, PaginationParams, INgxPaginationPage } from '@core/interfaces';
import { JobsService } from '../../../services/jobs/jobs.service';
import { FilterInterface, FilterJobType } from '@core/interfaces/filter-job-type';
import { SearchJobsService } from '../../../services/search-jobs/search-jobs.service';
import { filterJobHelper } from '@core/helpers/filter-job.helper';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit, OnDestroy {
    jobs: IJob[];
    jobsList: IJob[];
    meta: IMeta;
    metaList: IMeta;
    listShow: boolean = false;
    showModalDetail: boolean = false;
    showBoundaryLinks: boolean = true;
    maxSize: number = 5;
    jobSelected: IJob;
    private unsubscribe$ = new Subject();
    private paginationConfig: any = {
        startPage: 1,
        perPage: 12,
    };
    paginationParams: PaginationParams = {
        per_page: this.paginationConfig.perPage,
        page: this.paginationConfig.startPage,
        filterJobType: {
            url: 'categories',
            code: 'programming',
            filters: []
        },
    };
    private prevCatCodeLeakedJobs: string = '';
    private prevPgCodeLeakedJobs: number = this.paginationConfig.startPage;

    constructor(private jobsService: JobsService, private searchJobs: SearchJobsService) {}

    ngOnInit(): void {
        this.setJobs();
    }

    setJobs(): boolean | void {
        console.log('LLAMÓ setJobs')
        const filters: FilterInterface[] = this.paginationParams.filterJobType.filters
        const categoryCode = this.paginationParams.filterJobType.code;
        const page: number = this.paginationParams.page;

        console.log('current page', page)
        console.log('previous page', this.prevPgCodeLeakedJobs)

        if (
            this.prevCatCodeLeakedJobs == categoryCode &&
            this.prevPgCodeLeakedJobs == page
            // (filters.length > 0 && this.prevPgCodeLeakedJobs === page)
         ) {
            console.log('filtering ')
            this.jobsList = filterJobHelper(this.jobs, filters);
            const total_pages = filters.length > 0 ? 1 : this.meta.total_pages;
            this.metaList = { ...this.meta, total_pages };
            return false;
        }

        console.log('quering')

        this.prevCatCodeLeakedJobs = categoryCode;
        this.prevPgCodeLeakedJobs = page;
        this.jobsService.getAllJobs(this.paginationParams).subscribe({
            next: (resp) => {
                this.jobs = resp.data;
                this.meta = resp.meta;

                this.jobsList = filterJobHelper(this.jobs, filters);

                const total_pages = filters.length > 0 ? 1 : resp.meta.total_pages;

                this.metaList = { ...resp.meta, total_pages };
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

    filterJobList(filterJobType: FilterJobType) {
        // this.paginationParams.page = this.paginationParams.page;
        this.paginationParams.filterJobType = filterJobType; //envio una categoria
        this.setJobs();
    }

    showDetail(job: IJob) {
        this.jobSelected = job;
        this.showModalDetail = true;
    }

    onSearchJob(word: string) {
        this.paginationParams.page = 1;
        this.searchJobsWihAWord(word);
    }
}
