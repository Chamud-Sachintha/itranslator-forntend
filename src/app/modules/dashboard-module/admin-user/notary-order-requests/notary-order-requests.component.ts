import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
import { NotaryOrder } from 'src/app/shared/models/NotaryOrder/notary-order';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-notary-order-requests',
  templateUrl: './notary-order-requests.component.html',
  styleUrls: ['./notary-order-requests.component.css']
})
export class NotaryOrderRequestsComponent implements OnInit {

  subscription !: Subscription;
  requestMode = new Request();
  notaryOrderList: NotaryOrder[] = [];

  constructor(private orderService: OrderService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");

    this.subscription = timer(0, 1500).pipe(

      switchMap(() => this.orderService.getNotaryOrderList(this.requestMode))

    ).subscribe((result: any) => {
      this.notaryOrderList = [];
      const data = JSON.parse(JSON.stringify(result))

      data.data[0].forEach((eachData: NotaryOrder) => {
        const formatedDate = parseInt(eachData.createTime) * 1000;
        eachData.createTime = formatedDate.toString();

        this.notaryOrderList.push(eachData);
      })
    });
  }

  onClickAssignToMe(invoiceNo: string) {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = invoiceNo;
    this.requestMode.type = "NS";

    this.spinner.show();
    this.orderService.assinOrder(this.requestMode).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Order Assign", "Order Assign Successfully.");
      } else {
        this.tostr.error("Order Assign", resp.message);
      }

      this.spinner.hide();
    })
  }

}
