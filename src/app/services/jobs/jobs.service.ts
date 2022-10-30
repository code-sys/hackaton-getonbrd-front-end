import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IJobs, PaginationParams } from '@core/interfaces';
import { FilterJobType } from '@core/interfaces/filter-job-type';

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    private baseUrl = environment.GET_ON_BOARD_API + '/categories/programming/jobs'; //default as programming category
    constructor(private httpClient: HttpClient) {}

    setBaseUrlWithCategory(filterJobType: FilterJobType): void {
        this.baseUrl = environment.GET_ON_BOARD_API + `/${filterJobType.url}/${filterJobType.code}/jobs`;
    }

    getAllJobs(queryParameters: PaginationParams): Observable<IJobs> {
        let params: HttpParams = new HttpParams();
        params = params.set('per_page', queryParameters.per_page);
        params = params.set('page', queryParameters.page);
        params = params.set('expand', '["company"]');
        if (queryParameters.filterJobType.code) {
            this.setBaseUrlWithCategory(queryParameters.filterJobType);
        } else {
            this.setBaseUrlWithCategory({
                url: 'categories',
                code: 'programming',
            });
        }
        return this.httpClient.get<IJobs>(this.baseUrl, { params });
    }
}
