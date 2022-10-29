import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IJobs } from '../../common/interfaces/job';
import { PaginationParams } from '../../common/interfaces/pagination-params';

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    private readonly baseUrl = environment.GET_ON_BOARD_API + '/categories/programming/jobs';
    constructor(private httpClient: HttpClient) {}

    getAllJobs(queryParameters: PaginationParams): Observable<IJobs> {
        let params: HttpParams = new HttpParams();
        params = params.set('per_page', queryParameters.per_page);
        params = params.set('page', queryParameters.page);
        params = params.set('expand', '["company"]');
        return this.httpClient.get<IJobs>(this.baseUrl, { params });
    }
}
