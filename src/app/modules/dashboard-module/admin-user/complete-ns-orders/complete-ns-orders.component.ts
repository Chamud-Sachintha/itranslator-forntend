import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task/task.service';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateOrder } from 'src/app/shared/models/TranslateOrder/translate-order';

@Component({
  selector: 'app-complete-ns-orders',
  templateUrl: './complete-ns-orders.component.html',
  styleUrls: ['./complete-ns-orders.component.css']
})
export class CompleteNsOrdersComponent {
  requestParamModel = new Request();
  notaryServiceTaskList: TranslateOrder[] = [];

  constructor(private taskService: TaskService, private tost: ToastrService, private spinner: NgxSpinnerService
            , private router: Router) {}

  ngOnInit(): void {
    this.loadNotaryTaskList();
  }

  onClickProcessOrder(invoiceNo: string) {
    this.router.navigate(['/app/ns-order', invoiceNo]);
  }

  loadNotaryTaskList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    
    this.taskService.getCompleteNotaryServiceTaskList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: TranslateOrder) => {
          this.notaryServiceTaskList.push(eachRow);
        })
      }
    })
  }
}
