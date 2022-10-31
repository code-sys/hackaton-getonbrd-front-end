import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJob } from '@core/interfaces';

@Component({
    selector: 'app-jobs-list-cards',
    templateUrl: './jobs-list-cards.component.html',
    styleUrls: ['./jobs-list-cards.component.scss'],
})
export class JobsListCardsComponent implements OnInit {
    @Input() jobs: IJob[];
    @Output() goJobDetailsEmitter: EventEmitter<IJob> = new EventEmitter<IJob>();
    constructor() {}

    ngOnInit(): void {}

    onGoToJob(job: IJob) {
        this.goJobDetailsEmitter.emit(job);
    }
}
