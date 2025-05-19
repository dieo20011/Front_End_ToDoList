import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api/api.model';
import { environment } from '../../../environments/environment';
import { IHolidayAll } from './calendar-view.interface';

@Injectable()
export class CalendarViewApiService {
  private readonly _base = environment.API_DOMAIN;
  constructor(private readonly _http: HttpClient) {}

  public getAllToDoListData(id: number, status: number) {
    return this._http.get<ApiResponse<never>>(this._base + '/api/todo/get/' + id + '?status=' + status);
  }

  public deleteTask(id: string) {
    return this._http.delete<ApiResponse<never>>(this._base + '/api/todo/delete/' + id);
  }

  public getHolidayData(id: number) {
    return this._http.get<ApiResponse<IHolidayAll>>(this._base + '/api/holiday/get/' + id);
  }
}
