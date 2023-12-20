import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getTranslationOrderList(requestParam: Request) {
    const path = environment.appURL + "get-tr-orders";
    return this.http.post(path, requestParam);
  }

  assinOrder(requestModel: Request) {
    const path = environment.appURL + "assign-order";
    return this.http.post(path, requestModel);
  }

  getNotaryOrderList(requestParamModel: Request) {
    const path = environment.appURL + "get-ns-orders";
    return this.http.post(path, requestParamModel);
  }

  getOrderInfoByInvoice(requestModel: Request) {
    const path = environment.appURL + "get-order-info-by-invoice";
    return this.http.post(path, requestModel);
  }
}
