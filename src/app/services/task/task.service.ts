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

  getNotaryServiceTaskList(requestParamModel: Request) {
    const path = environment.appURL + "get-ns-task-list";
    return this.http.post(path, requestParamModel)
  }

  uploadTranslatedDocuments(requestParamModel: FormData) {
    const path = environment.appURL + "upload-translated-docs";
    return this.http.post(path, requestParamModel);
  }

  getUploadedDocsByOrder(requestParamModel: Request) {
    const path = environment.appURL + "get-doc-list-by-order";
    return this.http.post(path, requestParamModel);
  }

  sendAdminOrderMessage(requestParamModel: Request) {
    const path = environment.appURL + "send-admin-message";
    return this.http.post(path, requestParamModel);
  }

  getOrderMessageList(requestParamModel: Request) {
    const path = environment.appURL + "get-order-message-list";
    return this.http.post(path, requestParamModel);
  }
}
