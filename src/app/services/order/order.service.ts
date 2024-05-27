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

  assinLgOrder(requestModel: Request) {
    const path = environment.appURL + "assign-lg-order";
    return this.http.post(path, requestModel);
  }

  assinOrder(requestModel: Request) {
    const path = environment.appURL + "assign-order";
    return this.http.post(path, requestModel);
  }

  getNotaryOrderList(requestParamModel: Request) {
    const path = environment.appURL + "get-ns-orders";
    return this.http.post(path, requestParamModel);
  }

  getCSOrderList(requestModel: Request) {
    const path = environment.appURL + "get-cs-orders";
    return this.http.post(path, requestModel);
  }

  getLgOrderList(requestModel: Request) {
    const path = environment.appURL + "get-lg-orders";
    return this.http.post(path, requestModel);
  }

  getLgTaskList(requestModel: Request) {
    const path = environment.appURL + "get-lg-Task";
    return this.http.post(path, requestModel);
  }

  getLgCompleteList(requestModel: Request) {
    const path = environment.appURL + "get-lg-Complete";
    return this.http.post(path, requestModel);
  }

  getOrderInfoByInvoice(requestModel: Request) {
    const path = environment.appURL + "get-order-info-by-invoice";
    return this.http.post(path, requestModel);
  }

  getOrderDocumentsByOrderAndService(requestModel: Request) {
    const path = environment.appURL + "get-tr-order-docs-by-oid";
    return this.http.post(path, requestModel);
  }

  removeDocument(requestParamModel: Request) {
    const path = environment.appURL + "delete-doc";
    return this.http.post(path, requestParamModel);
  }

  getAllPendingOrdersList(requestModel: Request) {
    const path = environment.appURL + "get-pending-order-requests";
    return this.http.post(path, requestModel);
  }

  getOrderInfo(requestParamModel: Request) {
    const path = environment.appURL + "get-order-info";
    return this.http.post(path, requestParamModel);
  }

  updatePaymentStatus(requestModel: Request) {
    const path = environment.appURL + "update-payment-status";
    return this.http.post(path, requestModel);
  }

  updateOrderStatus(requestParamModel: Request) {
    const path = environment.appURL + "update-order-status";
    return this.http.post(path, requestParamModel);
  }

  getOrderMessageList(requestModel: Request){
    const path = environment.appURL + "get-admin-Lmessage";
    return this.http.post(path, requestModel);
  }

  sendAdminLegalMessage(formData:FormData){
    const path = environment.appURL + "send-admin-Lmessage";
    return this.http.post(path, formData);
  }


  getOrderDocList(requestModel: Request){
    const path = environment.appURL + "get-lgODoc-List";
    return this.http.post(path, requestModel);
  }

  getLegalAdviceDoc(requestModel: Request){
    const path = environment.appURL + "get-lgDoc-List";
    return this.http.post(path, requestModel);
  }

  ViewDoc(requestModel: Request){
    const path = environment.appURL + "view-lgDoc";
    return this.http.post(path, requestModel);
  }

}
