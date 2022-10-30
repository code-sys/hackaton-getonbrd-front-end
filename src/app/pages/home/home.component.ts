import { Component, OnInit } from '@angular/core';
import { IJob, PaginationParams } from '@core/interfaces';
import { randomNumber } from '@core/helpers/helper';
import { JobsService } from '../../services/jobs/jobs.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    jobs: IJob[];
    paginationParams: PaginationParams = {
        per_page: 12,
        page: randomNumber(1, 5),
        filterJobType: {
            code: null,
            url: null,
        },
    };
    showModalDetail: boolean = false;
    jobSelected: IJob;

    constructor(private jobsService: JobsService) {}

    ngOnInit(): void {
        this.setJobs();
    }

    setJobs() {
        this.jobsService.getAllJobs(this.paginationParams).subscribe({
            next: (resp) => {
                this.jobs = resp.data;
            },
        });
    }

    showDetail(job: IJob) {
        this.jobSelected = job;
        this.showModalDetail = true;
    }
}
