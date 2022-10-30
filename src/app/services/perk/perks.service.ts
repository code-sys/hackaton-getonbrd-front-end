import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PerksResponse } from '@core/interfaces/list-perk';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerksService {

  baseUrl = environment.GET_ON_BOARD_API + '/perks';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll() : Observable<PerksResponse>{    
    return this.httpClient.get<PerksResponse>(this.baseUrl);
  }
}
