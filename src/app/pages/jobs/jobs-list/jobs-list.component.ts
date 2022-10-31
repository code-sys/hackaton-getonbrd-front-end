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
        const categoryCode: string = this.paginationParams.filterJobType.code;
        const page: number = this.paginationParams.page;

        if (
            this.prevCatCodeLeakedJobs == categoryCode &&
            this.prevPgCodeLeakedJobs == page
            // (filters.length > 0 && this.prevPgCodeLeakedJobs === page)
         ) {
            console.log('filtering ')
            this.filterJobs();
            return false;
        }

        console.log('quering')
        this.queryJobs();
    }

    private queryJobs(): void {
        const categoryCode: string = this.paginationParams.filterJobType.code;
        const page: number = this.paginationParams.page;

        this.prevCatCodeLeakedJobs = categoryCode;
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
                this.jobs = [];
                this.meta = {
                    page: 1,
                    per_page: 10,
                    total_pages: 0,
                };
            },
        });
    }

    private filterJobs(): void {
        const filters: FilterInterface[] = this.paginationParams.filterJobType.filters
        const total_pages = filters.length > 0 ? 1 : this.meta.total_pages;

        this.jobsList = filterJobHelper(this.jobs, filters);
        this.metaList = { ...this.meta, total_pages };
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
        // TODO la pg cambia en otra parte el código relacionado con la paginación
        //      y se realiza un segundo llamado, verificar cambios en la propiedad this.meta.
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
