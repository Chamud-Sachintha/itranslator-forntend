import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Dashboard } from 'src/app/shared/models/Dashboard/dashboard';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dashboardModel = new Dashboard();
  requestParamModel = new Request();
  role!: string;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.checkPermissions();

    if (this.role == "SA") {
      this.loadSuperAdminCounts();
    } else if (this.role == "A") {
      this.loadAdminCounts();
    } else {

    }
  }

  loadAdminCounts() {

  }

  loadSuperAdminCounts() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.dashboardService.getDashboardData(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.dashboardModel.totalOrderCount = dataList.data[0].totalOrderCount;
        this.dashboardModel.totalNotAssignedCount = dataList.data[0].totalNotAssignedCount;
        this.dashboardModel.totalAssignedCount = dataList.data[0].totalAssignedCount;
        this.dashboardModel.totalCompletedCount = dataList.data[0].totalNCompletedCount;
      }
    })
  }

  checkPermissions() {
    const role = sessionStorage.getItem("role");

    if (role == "SA") {
      this.role = "SA";
    } else if (role == "A") {
      this.role = "A";
    } else {

    }
  }

}
