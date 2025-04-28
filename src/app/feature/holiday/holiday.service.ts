import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHolidayRequest, IHolidayRequestPaing, IHolidayResponse } from './holiday.interface';
import { ApiResponse } from '../../../core/models/api/api.model';
import { environment } from '../../../environments/environment';


@Injectable()
export class HolidayService {
  private readonly _base = environment.API_DOMAIN;

  constructor(private readonly httpClient: HttpClient) {}

  public getAllHolidayData(userId: string, request: IHolidayRequestPaing) {
    const params = new HttpParams()
      .set('pageIndex', request.pageIndex.toString())
      .set('pageSize', request.pageSize.toString())
      .set('keyword', request.keyword || '');
  
    return this.httpClient.get<ApiResponse<IHolidayResponse>>(
      `${this._base}/api/holiday/get/${userId}`,
      { params }
    );
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

  public updateAnnualHoliday(userId: string, holidayId: number, isAnnualHoliday: boolean) {
    return this.httpClient.put<ApiResponse<never>>(this._base + '/api/holiday/update-status/' + userId  + '/' + holidayId, isAnnualHoliday);
  }

  public deleteHoliday(userId: number, holidayId: number) {
    return this.httpClient.delete<ApiResponse<never>>(this._base + '/api/holiday/delete/' + userId + '/' + holidayId);
  }
}
