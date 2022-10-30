import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '@core/interfaces/category';
import { PaginationParams } from '@core/interfaces/pagination-params';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl = environment.GET_ON_BOARD_API + '/categories';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllCategories(queryParameters: PaginationParams) : Observable<CategoriesResponse>{
    let params: HttpParams = new HttpParams();
    params = params.set('per_page', queryParameters.per_page);
    params = params.set('page', queryParameters.page);
    return this.httpClient.get<CategoriesResponse>(this.baseUrl, {params});
  }  
}
