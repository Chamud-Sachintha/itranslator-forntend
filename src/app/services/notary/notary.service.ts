import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainNotaryCategory } from 'src/app/shared/models/MainNotaryCategory/main-notary-category';
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
}
