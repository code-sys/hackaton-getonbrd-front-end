import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SenioritiesResponse } from '@core/interfaces/list-seniority';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SenioritiesService {

  baseUrl = environment.GET_ON_BOARD_API + '/seniorities';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll() : Observable<SenioritiesResponse>{
    return this.httpClient.get<SenioritiesResponse>(this.baseUrl);
  }
}
