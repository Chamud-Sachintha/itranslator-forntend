import { Component, OnInit } from '@angular/core';
import { Request } from '../models/Request/request';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  requestModel = new Request();
  superAdminPerm = false;
  clientPerm = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.checkMenuPermissionForUser();
    }, 600);
  }

  checkMenuPermissionForUser() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.authService.getMenuPermissions(this.requestModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        if (this.requestModel.flag === "SA") {
          this.superAdminPerm = true;
        } else if (this.requestModel.flag == "C") {
          this.superAdminPerm = false;
          this.clientPerm = true;
        }
      }
    }, (err) => {

    })
  }

}
