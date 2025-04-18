import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoliday, IHolidayRequest } from './holiday.interface';
import { ApiResponse } from '../../../core/models/api/api.model';
import { environment } from '../../../environments/environment';


@Injectable()
export class HolidayService {
  private readonly _base = environment.API_DOMAIN;

  constructor(private readonly httpClient: HttpClient) {}

  public getAllHoLidayData(userId: string) {
    return this.httpClient.get<ApiResponse<IHoliday[]>>(this._base + '/api/holiday/get/' + userId);
  }

  public getDetailHoLidayData(userId: string, holidayId: number) {
    return this.httpClient.get<ApiResponse<IHolidayRequest>>(this._base + '/api/holiday/get/detail/' + userId + '/' + holidayId);
  }

  public newHoliday(data: IHolidayRequest) {
    return this.httpClient.post<ApiResponse<never>>(this._base + '/api/holiday/add', data);
  }

  public updateHoliday(id: number, data: IHolidayRequest) {
    return this.httpClient.put<ApiResponse<never>>(this._base + '/api/holiday/update/' + id, data);
  }

  public deleteHoliday(userId: number, holidayId: number) {
    return this.httpClient.delete<ApiResponse<never>>(this._base + '/api/holiday/delete/' + userId + '/' + holidayId);
  }
}
