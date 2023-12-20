import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateTask } from 'src/app/shared/models/TranslateTask/translate-task';

@Component({
  selector: 'app-translate-order-process',
  templateUrl: './translate-order-process.component.html',
  styleUrls: ['./translate-order-process.component.css']
})
export class TranslateOrderProcessComponent implements OnInit {

  requestMode = new Request();
  taskList: TranslateTask[] = [];
  invoiceNo!: string;

  constructor(private activateRoute: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activateRoute.snapshot.params['invoiceId'];

    this.loadOrderRequestDetails();
  }

  loadOrderRequestDetails() {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = this.invoiceNo;

    this.orderService.getOrderInfoByInvoice(this.requestMode).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: TranslateTask) => {
          const formatedCreatedDate = parseInt(eachRow.createTime) * 1000;
          const formatedAssignedTime = parseInt(eachRow.assignedTime) * 1000;

          eachRow.createTime = formatedCreatedDate.toString();
          eachRow.assignedTime = formatedAssignedTime.toString();

          this.taskList.push(eachRow);
        })
      }
    })
  }

}
