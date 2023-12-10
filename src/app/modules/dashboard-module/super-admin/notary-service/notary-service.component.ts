import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { MainNotaryCategory } from 'src/app/shared/models/MainNotaryCategory/main-notary-category';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { SubNotaryCategory } from 'src/app/shared/models/SubNotaryCategory/sub-notary-category';

@Component({
  selector: 'app-notary-service',
  templateUrl: './notary-service.component.html',
  styleUrls: ['./notary-service.component.css']
})
export class NotaryServiceComponent implements OnInit {

  mainNotaryCategoryForm!: FormGroup;
  subNotaryCategoryForm!: FormGroup;
  mainCategoryModel = new MainNotaryCategory();
  subCategoryModel = new SubNotaryCategory();
  searchParamModel = new SearchParam();
  mainNotaryCategoryList: MainNotaryCategory[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private notaryService: NotaryService
            , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initMainNotaryCategoryForm();
    this.initSubNotaryCategoryForm();
    this.loadMainCategoryList();
    this.loadSubCategoryList();
  }

  loadSubCategoryList() {

  }

  onSubmitSubCategoryForm() {
    const mainCategoryId = this.subNotaryCategoryForm.controls['mainCategoryId'].value;
    const subCategoryName = this.subNotaryCategoryForm.controls['subCategoryName'].value;

    if (mainCategoryId == "") {
      this.tostr.error("Create Sub Category", "Main Category is Required.");
    } else if (subCategoryName == "") {
      this.tostr.error("Create Sub Category", "Sub Category Name is Required.");
    } else {
      this.subCategoryModel.token = sessionStorage.getItem("authToken");
      this.subCategoryModel.flag = sessionStorage.getItem("flag");
      this.subCategoryModel.subCategoryName = subCategoryName;

      
    }
  }

  initSubNotaryCategoryForm() {
    this.subNotaryCategoryForm = this.formBuilder.group({
      mainCategoryId: ['', Validators.required],
      subCategoryName: ['', Validators.required]
    })
  }

  loadMainCategoryList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    
    this.notaryService.getAllNotaryMainCategoryList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: MainNotaryCategory) => {
          const formatedDate = parseInt(eachCategory.createTime) * 1000;
          eachCategory.createTime = formatedDate.toString();

          this.mainNotaryCategoryList.push(eachCategory);
        })
      }
    })
  }

  onSubmitMainCatgeoryForm() {
    const categoryName = this.mainNotaryCategoryForm.controls['categoryName'].value;

    if (categoryName == "") {
      this.tostr.error("Create Main Category", "Category Name is Required.");
    } else {
      this.mainCategoryModel.token = sessionStorage.getItem("authToken");
      this.mainCategoryModel.flag = sessionStorage.getItem("role");
      this.mainCategoryModel.categoryName = categoryName;

      this.spinner.show();
      this.notaryService.addMainNotaryServiceCategory(this.mainCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Create Main Notary Service", "Created Successfully.");
          this.spinner.hide();

          location.reload();
        } else {
          this.tostr.error("Create Main Notary Service", resp.message);
          this.spinner.hide();
        }
      })
    }
  }

  initMainNotaryCategoryForm() {
    this.mainNotaryCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    })
  }

}
