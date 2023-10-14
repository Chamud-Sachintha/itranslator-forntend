import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/shared/models/service/service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  addNewService(serviceModel: Service) {
    const path = environment.appURL + "add-service";
    return this.http.post(path, serviceModel);
  }
}
