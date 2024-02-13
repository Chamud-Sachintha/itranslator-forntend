import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { MainNotaryCategory } from 'src/app/shared/models/MainNotaryCategory/main-notary-category';
import { Request } from 'src/app/shared/models/Request/request';
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
  updateMainNotaryForm!: FormGroup;
  updateSubnotaryForm!: FormGroup;
  mainCategoryModel = new MainNotaryCategory();
  subCategoryModel = new SubNotaryCategory();
  searchParamModel = new SearchParam();
  mainNotaryCategoryList: MainNotaryCategory[] = [];
  subNotaryCategoryList: SubNotaryCategory[] = [];
  requestParamModel = new Request();
  categoryId!: string;
  mainCategoryUpdate = false;
  subCategoryUpdate = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private notaryService: NotaryService
            , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initMainNotaryCategoryForm();
    this.initSubNotaryCategoryForm();
    this.loadMainCategoryList();
    this.loadSubCategoryList();
    this.initUpdateMainNotaryForm();
    this.initUpdateSubCategoryForm();
  }

  setId(categoryId: string, categoryName: string, type: number) {
    this.categoryId = categoryId;

    if (type == 1) {
      this.updateMainNotaryForm.controls['categoryName'].setValue(categoryName);
      this.mainCategoryUpdate = true;
      this.subCategoryUpdate = false;
    } else {
      this.updateSubnotaryForm.controls['categoryName'].setValue(categoryName);
      this.mainCategoryUpdate = false;
      this.subCategoryUpdate = true;
    }
  }

  onSubmitSubCategoryUpdateform() {
    const categoryName = this.updateSubnotaryForm.controls['categoryName'].value;

    if (categoryName == "") {
      this.tostr.error("Empty Field Found", "Please Enter Category Name");
    } else {
      this.requestParamModel.token = sessionStorage.getItem("authToken");
      this.requestParamModel.flag = sessionStorage.getItem("role");
      this.requestParamModel.categoryId = this.categoryId;
      this.requestParamModel.categoryName = categoryName;

      this.notaryService.updateSubNotaryCategoryById(this.requestParamModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Main Notary Category", "Updated Successfully");
        } else {
          this.tostr.error("Update Main Notary Categeory", resp.message);
        }
      })
    }
  }

  onSubmitUpdateMainNotaryForm() {
    const categoryName = this.updateMainNotaryForm.controls['categoryName'].value;

    if (categoryName == "") {
      this.tostr.error("Empty Field Found", "Please Enter Category Name");
    } else {
      this.requestParamModel.token = sessionStorage.getItem("authToken");
      this.requestParamModel.flag = sessionStorage.getItem("role");
      this.requestParamModel.categoryId = this.categoryId;
      this.requestParamModel.categoryName = categoryName;

      this.notaryService.updateMainNotaryCategory(this.requestParamModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Update Main Notary Category", "Updated Successfully");
        } else {
          this.tostr.error("Update Main Notary Categeory", resp.message);
        }
      })
    }
  }

  initUpdateMainNotaryForm() {
    this.updateMainNotaryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    })
  }

  initUpdateSubCategoryForm() {
    this.updateSubnotaryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    })
  }

  loadSubCategoryList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.notaryService.getAllSubNotaryCategoryList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: SubNotaryCategory) => {
          const formatedDate = parseInt(eachCategory.createTime) * 1000;
          eachCategory.createTime = formatedDate.toString();

          this.subNotaryCategoryList.push(eachCategory);
        })
      }
    })
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
      this.subCategoryModel.flag = sessionStorage.getItem("role");
      this.subCategoryModel.mainCategoryId = mainCategoryId;
      this.subCategoryModel.subCategoryName = subCategoryName;

      this.spinner.show();
      this.notaryService.addSubNotaryServiceCategory(this.subCategoryModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Create Sub Category", "Sub Category Created Successfully.");
        } else {
          this.tostr.error("Create Sub Category", resp.message);
        }

        this.spinner.hide();
      })
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
