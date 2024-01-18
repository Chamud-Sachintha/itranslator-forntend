import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainNotaryCategory } from 'src/app/shared/models/MainNotaryCategory/main-notary-category';
import { NotaryPaymentLog } from 'src/app/shared/models/NotaryPaymentLog/notary-payment-log';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { SubNotaryCategory } from 'src/app/shared/models/SubNotaryCategory/sub-notary-category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotaryService {

  constructor(private http: HttpClient) { }

  addMainNotaryServiceCategory(mainNotaryCategory: MainNotaryCategory) {
    const path = environment.appURL + "add-notary-main-category";
    return this.http.post(path, mainNotaryCategory);
  }

  getAllNotaryMainCategoryList(searchParamModel: SearchParam) {
    const path = environment.appURL + "get-all-main-notary-categories";
    return this.http.post(path, searchParamModel);
  }
  
  addSubNotaryServiceCategory(subNotaryCategory: SubNotaryCategory) {
    const path = environment.appURL + "add-notary-sub-category";
    return this.http.post(path, subNotaryCategory);
  }

  getNotaryOrderPayStatus(requestParamModel: Request) {
    const path = environment.appURL + "get-ns-order-payment-status";
    return this.http.post(path, requestParamModel);
  }

  getNotaryOrderInfoByInvoice(requestParamModel: Request) {
    const path = environment.appURL + "get-notary-order-by-invoice";
    return this.http.post(path, requestParamModel);
  }

  addPaymentLog(paymentLog: NotaryPaymentLog) {
    const path = environment.appURL + "add-payment-log";
    return this.http.post(path, paymentLog);
  } 
}
