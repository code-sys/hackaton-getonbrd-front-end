import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IJob } from '@core/interfaces';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
    selector: 'app-jobs-detail',
    templateUrl: './jobs-detail.component.html',
    styleUrls: ['./jobs-detail.component.scss'],
})
export class JobsDetailComponent implements AfterViewInit {
    @Input()
    inputJob: IJob;
    @Output()
    close = new EventEmitter();
    @ViewChild('modalJobDetail', { static: false })
    readonly modalJobDetail: ModalDirective;
    constructor() {}

    ngAfterViewInit(): void {
        this.modalJobDetail.show();
    }

    onHidden() {
        this.close.emit();
    }
}
