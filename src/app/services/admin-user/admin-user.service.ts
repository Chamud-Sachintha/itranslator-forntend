import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUser } from 'src/app/shared/models/AdminUser/admin-user';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  createAdminUser(adminUserModel: AdminUser) {
    const path = environment.appURL + "create-admin-user";
    return this.http.post(path, adminUserModel);
  }

  getAdminUserList(searchParamModel: SearchParam) {
    const path = environment.appURL + "get-admin-user-list";
    return this.http.post(path, searchParamModel);
  }
}
