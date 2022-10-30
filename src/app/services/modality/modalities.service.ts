import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalitiesResponse } from '@core/interfaces/list-modality';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalitiesService {

  baseUrl = environment.GET_ON_BOARD_API + '/modalities';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll() : Observable<ModalitiesResponse>{   
    return this.httpClient.get<ModalitiesResponse>(this.baseUrl);
  }
}
