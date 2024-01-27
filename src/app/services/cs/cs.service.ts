import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CSPaymentLog } from 'src/app/shared/models/CSPaymentLog/cspayment-log';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CsService {

  constructor(private http: HttpClient) { }

  getOrderInfoByInvoice(requestParamModel: Request) {
    const path = environment.appURL + "get-cs-order-info-by-invoice";
    return this.http.post(path, requestParamModel);
  }

  addPaymentLog(csPaymentLog: CSPaymentLog) {
    const path = environment.appURL + "add-cs-pay-log";
    return this.http.post(path, csPaymentLog);
  }

  getCsOrderPaymentStatus(requestParamModel: Request) {
    const path = environment.appURL + "get-cs-order-payment-info";
    return this.http.post(path, requestParamModel);
  }
}
