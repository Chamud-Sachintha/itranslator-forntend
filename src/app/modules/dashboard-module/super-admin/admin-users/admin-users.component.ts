import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminUserService } from 'src/app/services/admin-user/admin-user.service';
import { AdminUser } from 'src/app/shared/models/AdminUser/admin-user';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  addAdminUserForm!: FormGroup;
  adminUserModel = new AdminUser();
  searchParamModel = new SearchParam();
  adminUserList: AdminUser[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private tost: ToastrService, private spinner: NgxSpinnerService
            , private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.initAddAdminUserForm();
    this.loadAdminUserList();
  }

  loadAdminUserList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.adminUserService.getAdminUserList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachAdmin: AdminUser) => {
          const formatedDate = parseInt(eachAdmin.createTime) * 1000;
          eachAdmin.createTime = formatedDate.toString();

          this.adminUserList.push(eachAdmin);
        })
      }
    })
  }

  onSubmitAddAdminUserForm() {
    const firstName = this.addAdminUserForm.controls['firstName'].value;
    const lastName = this.addAdminUserForm.controls['lastName'].value;
    const email = this.addAdminUserForm.controls['email'].value;
    const password = this.addAdminUserForm.controls['password'].value;

    if (firstName == "") {

    } else if (lastName == "") {

    } else if (email == "") {

    } else if (password == "") {

    } else {
      this.adminUserModel.firstName = firstName;
      this.adminUserModel.lastName = lastName;
      this.adminUserModel.emailAddress = email;
      this.adminUserModel.password = password;

      this.adminUserModel.token = sessionStorage.getItem("authToken");
      this.adminUserModel.flag = sessionStorage.getItem("role");

      this.spinner.show();
      this.adminUserService.createAdminUser(this.adminUserModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tost.success("Create Admin User", "Admin User Created Successfully.");
        } else {
          this.tost.error("Create Admin User", resp.message);
        }

        this.spinner.hide();
      })
    }
  }

  initAddAdminUserForm() {
    this.addAdminUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

}
