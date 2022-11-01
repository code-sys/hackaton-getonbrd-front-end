import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { IJob, IMeta, PaginationParams, INgxPaginationPage } from '@core/interfaces';
import { JobsService } from '../../../services/jobs/jobs.service';
import { FilterInterface, FilterJobType } from '@core/interfaces/filter-job-type';
import { SearchJobsService } from '../../../services/search-jobs/search-jobs.service';
import { filterJobHelper } from '@core/helpers/filter-job.helper';
import { PaginationComponent } from 'ngx-bootstrap/pagination';

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
    onSelectedChange: boolean = false;
    maxSize: number = 5;
    jobSelected: IJob;
    rememberWord: string = '';
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
            filters: [],
        },
    };

    @ViewChild(PaginationComponent)
    paginationComp!: PaginationComponent;
    private prevCatCodeLeakedJobs: string = '';
    private prevPgCodeLeakedJobs: number = this.paginationConfig.startPage;

    constructor(private jobsService: JobsService, private searchJobs: SearchJobsService) {}

    ngOnInit(): void {
        this.setJobs();
    }

    setJobs(): boolean | void {
        const categoryCode: string = this.paginationParams.filterJobType.code;
        const page: number = this.paginationParams.page;
        if (this.prevCatCodeLeakedJobs == categoryCode && this.prevPgCodeLeakedJobs == page) {
            this.filterJobs();
            if (!this.rememberWord) {
                this.queryJobs();
            }
            return false;
        }
        this.queryJobs();
    }

    queryByCategory(value) {
        this.paginationParams.filterJobType.code = value.code;
        this.jobsService.getAllJobs(this.paginationParams).subscribe({
            next: (resp) => {
                const filters: FilterInterface[] = this.paginationParams.filterJobType.filters;
                const total_pages = filters.length > 0 ? 1 : resp.meta.total_pages;
                this.jobs = resp.data;
                this.meta = resp.meta;
                this.jobsList = filterJobHelper(this.jobs, filters);
                this.metaList = { ...resp.meta, total_pages };
            },
            error: (_error) => {
                this.resetPagination();
            },
        });
    }

    queryJobs(): void {
        const page: number = this.paginationParams.page;
        this.prevPgCodeLeakedJobs = page;
        this.jobsService.getAllJobs(this.paginationParams).subscribe({
            next: (resp) => {
                const filters: FilterInterface[] = this.paginationParams.filterJobType.filters;
                const total_pages = filters.length > 0 ? 1 : resp.meta.total_pages;
                this.jobs = resp.data;
                this.meta = resp.meta;
                this.jobsList = filterJobHelper(this.jobs, filters);
                this.metaList = { ...resp.meta, total_pages };
            },
            error: (_error) => {
                this.resetPagination();
            },
        });
    }

    private filterJobs(): void {
        const filters: FilterInterface[] = this.paginationParams.filterJobType.filters;
        this.jobsList = filterJobHelper(this.jobs, filters);
    }

    searchJobsWihAWord(word: string) {
        this.searchJobs.searchJobs(this.paginationParams, word).subscribe({
            next: (resp) => {
                this.jobs = resp.data;
                this.jobsList = resp.data;
                this.meta = resp.meta;
                this.metaList = resp.meta;
            },
            error: (_error) => {
                this.resetPagination();
            },
        });
    }

    onPageChanged(page: INgxPaginationPage) {
        if (this.onSelectedChange) {
            this.onSelectedChange = false;
            return;
        }
        if (
            this.rememberWord &&
            this.rememberWord !== '' &&
            this.rememberWord !== null &&
            this.rememberWord !== undefined
        ) {
            this.paginationParams.page = page.page;
            this.paginationParams.page = page.page;
            this.onSearchJob(this.rememberWord);
            return;
        }

        this.paginationParams.page = page.page;
        this.setJobs();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }

    filterJobList(filterJobType: FilterJobType) {
        this.paginationParams.filterJobType = filterJobType; //envio una categoria
        if (filterJobType.filters.length == 0) {
            this.onSelectedChange = false;
        }
        this.filterJobs();
    }

    showDetail(job: IJob) {
        this.jobSelected = job;
        this.showModalDetail = true;
    }

    onSearchJob(word: string) {
        if (word) {
            this.searchJobsWihAWord(word);
            this.rememberWord = word;
        } else {
            this.rememberWord = '';
            this.resetPagination();
            this.setJobs();
        }
    }

    resetPagination() {
        this.jobsList = [];
        this.jobs = [];
        this.meta = { page: 1, per_page: 10, total_pages: 0 };
        this.metaList = this.meta;
    }
}
