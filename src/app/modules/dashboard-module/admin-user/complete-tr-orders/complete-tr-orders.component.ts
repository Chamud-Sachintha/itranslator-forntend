import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateOrder } from 'src/app/shared/models/TranslateOrder/translate-order';

@Component({
  selector: 'app-complete-tr-orders',
  templateUrl: './complete-tr-orders.component.html',
  styleUrls: ['./complete-tr-orders.component.css']
})
export class CompleteTrOrdersComponent {
  requestParamModel = new Request();
  translateTaskList: TranslateOrder[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTranslationTaskList();
  }

  onClickProcessOrder(invoiceNo: string) {
    this.router.navigate(['app/tr-order/', invoiceNo]);
  }

  loadTranslationTaskList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.taskService.getCompleteTranslateTaskList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachOrder: TranslateOrder) => {
          const formatedCreateDate = parseInt(eachOrder.createTime) * 1000;
          const formatedAssignedTime = parseInt(eachOrder.assignedTime) * 1000;

          eachOrder.createTime = formatedCreateDate.toString();
          eachOrder.assignedTime = formatedAssignedTime.toString();

          this.translateTaskList.push(eachOrder);
        })
      }
    })
  }
}
