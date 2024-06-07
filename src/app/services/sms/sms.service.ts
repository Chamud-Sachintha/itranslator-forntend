import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderNotification } from 'src/app/shared/models/OrderNotification/order-notification';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient) { }

  sendOrderCompleteNotification(orderNotification: OrderNotification) {
    const path = environment.appURL + "send-order-complete-sms";
    return this.http.post(path, orderNotification);
  }
}
