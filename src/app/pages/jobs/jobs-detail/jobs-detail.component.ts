import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJob } from '@core/interfaces';
@Component({
    selector: 'app-jobs-detail',
    templateUrl: './jobs-detail.component.html',
    styleUrls: ['./jobs-detail.component.scss'],
})
export class JobsDetailComponent implements OnInit {
    @Input()
    inputJob: IJob;
    @Output()
    close = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        console.log('My input job is ', this.inputJob);
    }
}
