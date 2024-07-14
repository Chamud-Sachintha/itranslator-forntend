import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task/task.service';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateOrder } from 'src/app/shared/models/TranslateOrder/translate-order';

@Component({
  selector: 'app-complete-cs-orders',
  templateUrl: './complete-cs-orders.component.html',
  styleUrls: ['./complete-cs-orders.component.css']
})
export class CompleteCsOrdersComponent {
  requestParamModel = new Request();
  csServiceTaskList: TranslateOrder[] = [];

  constructor(private taskService: TaskService, private tost: ToastrService, private spinner: NgxSpinnerService
            , private router: Router) {}

  ngOnInit(): void {
    this.loadNotaryTaskList();
  }

  onClickProcessOrder(invoiceNo: string) {
    this.router.navigate(['/app/cs-order', invoiceNo]);
  }

  loadNotaryTaskList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    
    this.taskService.getCompleteCSServiceTaskList(this.requestParamModel).subscribe((resp: any) => {
     
      const dataList = JSON.parse(JSON.stringify(resp));
      console.log(dataList)
      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: TranslateOrder) => {
          this.csServiceTaskList.push(eachRow);
        })
      }
    })
  }

}
