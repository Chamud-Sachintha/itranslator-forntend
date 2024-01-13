import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {

  requestModel = new Request();
  orderRequestList: OrderRequest[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPendingOrderList();
  }

  onClickCheckOrder(invoiceNo: string) {
    this.router.navigate(['/app/check-order', invoiceNo]);
  }

  getAllPendingOrderList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.orderService.getAllPendingOrdersList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachOrder: OrderRequest) => {
          const formatedDate = parseInt(eachOrder.createTime) * 1000;
          eachOrder.createTime = formatedDate.toString();

          this.orderRequestList.push(eachOrder);
        })
      }
    })
  }

}
