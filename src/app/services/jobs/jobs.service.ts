import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IJobs, PaginationParams } from '@core/interfaces';

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    private baseUrl = environment.GET_ON_BOARD_API + '/categories/programming/jobs'; //por defecto viene filtrado por programming
    constructor(private httpClient: HttpClient) {}

    setBaseUrlWithCategory(category: string): void {
        this.baseUrl = environment.GET_ON_BOARD_API + '/categories/' + category + '/jobs';
    }

    getAllJobs(queryParameters: PaginationParams): Observable<IJobs> {
        let params: HttpParams = new HttpParams();
        params = params.set('per_page', queryParameters.per_page);
        params = params.set('page', queryParameters.page);
        params = params.set('expand', '["company"]');
        if (queryParameters.category) {
            this.setBaseUrlWithCategory(queryParameters.category);
        } else {
            this.setBaseUrlWithCategory('programming');
        }
        return this.httpClient.get<IJobs>(this.baseUrl, { params });
    }
}
