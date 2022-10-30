import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams } from '@core/interfaces';
import { environment } from 'src/environments/environment';
import { CompaniesResponse } from '@core/interfaces/list-company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  baseUrl = environment.GET_ON_BOARD_API + '/companies';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(queryParameters: PaginationParams) : Observable<CompaniesResponse>{
    let params: HttpParams = new HttpParams();
    params = params.set('per_page', queryParameters.per_page);
    params = params.set('page', queryParameters.page);
    return this.httpClient.get<CompaniesResponse>(this.baseUrl, {params});
  }
}
