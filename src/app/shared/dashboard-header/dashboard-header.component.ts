import { Component, OnInit } from '@angular/core';
import { Request } from '../models/Request/request';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  requestModel = new Request();
  superAdminPerm = false;
  clientPerm = false;
  adminUserPerm = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.checkMenuPermissionForUser();
    }, 500);
  }

  onClickSignOut() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("emailAddress");

    this.router.navigate(['auth']);
  }

  checkMenuPermissionForUser() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.authService.getMenuPermissions(this.requestModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        if (this.requestModel.flag === "SA") {
          this.superAdminPerm = true;
          this.clientPerm = false;
          this.adminUserPerm = false;
        } else if (this.requestModel.flag === "A") {
          this.superAdminPerm = false;
          this.clientPerm = false;
          this.adminUserPerm = true;
        } else if (this.requestModel.flag == "C") {
          this.superAdminPerm = false;
          this.clientPerm = true;
          this.adminUserPerm = false;
        }
      }
    }, (err) => {

    })
  }

}
