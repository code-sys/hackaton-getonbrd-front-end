import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IJobs, PaginationParams } from '../../common/interfaces';

@Injectable({
    providedIn: 'root',
})
export class SearchJobsService {
    private baseUrl = environment.GET_ON_BOARD_API + '/search/jobs';
    constructor(private httpClient: HttpClient) {}
    // https://www.getonbrd.com/api/v0/search/jobs?query=Ruby+on+Rails&per_page=2&page=1&expand=["company"]&country_code=MX&remote=true

    searchJobs(queryParameters: PaginationParams, filter: string): Observable<IJobs> {
        let params: HttpParams = new HttpParams();
        params = params.set('per_page', queryParameters.per_page);
        params = params.set('page', queryParameters.page);
        params = params.set('expand', '["company","modality","seniority"]');
        params = params.set('query', filter);
        return this.httpClient.get<IJobs>(this.baseUrl, { params });
    }
}
