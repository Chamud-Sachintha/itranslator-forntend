import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTranslateTaskList(requestParamModel: Request) {
    const path = environment.appURL + "get-tr-task-list";
    return this.http.post(path, requestParamModel);
  }
}
