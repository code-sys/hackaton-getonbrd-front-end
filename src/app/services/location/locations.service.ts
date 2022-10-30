import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationParams } from '@core/interfaces';
import { CitiesResponse } from '@core/interfaces/list-city';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  baseUrl = environment.GET_ON_BOARD_API + '/cities';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(queryParameters: PaginationParams) : Observable<CitiesResponse>{
    let params: HttpParams = new HttpParams();
    params = params.set('per_page', queryParameters.per_page);
    params = params.set('page', queryParameters.page);
    return this.httpClient.get<CitiesResponse>(this.baseUrl, {params});
  }
}
