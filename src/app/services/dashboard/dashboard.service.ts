import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardData(requestParamModel: Request) {
    const path = environment.appURL + "get-sa-dashboard-data";
    return this.http.post(path, requestParamModel);
  }
}
