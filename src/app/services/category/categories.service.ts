import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '@core/interfaces/category';
import { PaginationParams } from '@core/interfaces/pagination-params';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl = environment.urlBase + '/categories';
  constructor(
    private http: HttpClient,
  ) { }

  getAllCategories(queryParameters: PaginationParams) : Observable<Category[]>{
    let params: HttpParams = new HttpParams();
    params = params.set('per_page', queryParameters.per_page);
    params = params.set('page', queryParameters.page);
    return this.httpClient.get<CentersResponse>(this.baseUrl, {params});
  }  
}
