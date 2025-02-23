import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api/api.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CalendarViewApiService {
  private readonly _base = environment.API_DOMAIN;
  constructor(private readonly _http: HttpClient) {}

  getAllToDoListData() {
    return this._http.get<ApiResponse<never>>(this._base + '/api/todo/get');
  }
}
