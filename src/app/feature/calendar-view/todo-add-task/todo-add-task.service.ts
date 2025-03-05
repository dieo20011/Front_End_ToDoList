import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoAddRequest } from './todo-add-task.interface';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api/api.model';


@Injectable()
export class TodoTaskApiService {
  private readonly _base = environment.API_DOMAIN;

  constructor(private readonly httpClient: HttpClient) {}

  public newTask(data: ToDoAddRequest) {
    return this.httpClient.post<ApiResponse<never>>(this._base + '/api/todo/add', data);
  }

  public updateTask(id: string, data: ToDoAddRequest) {
    return this.httpClient.put<ApiResponse<never>>(this._base + '/api/todo/update/' + id, data);
  }
}
