import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateOrder } from 'src/app/shared/models/TranslateOrder/translate-order';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-translate-order-requests',
  templateUrl: './translate-order-requests.component.html',
  styleUrls: ['./translate-order-requests.component.css']
})
export class TranslateOrderRequestsComponent implements OnInit {

  subscription !: Subscription;
  requestMode = new Request();
  translateOrderList: TranslateOrder[] = [];

  constructor(private orderService: OrderService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {

    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");

    this.subscription = timer(0, 1500).pipe(

      switchMap(() => this.orderService.getTranslationOrderList(this.requestMode))

    ).subscribe((result: any) => {
      this.translateOrderList = [];
      const data = JSON.parse(JSON.stringify(result))

      data.data[0].forEach((eachData: TranslateOrder) => {
        const formatedDate = parseInt(eachData.createTime) * 1000;
        eachData.createTime = formatedDate.toString();

        this.translateOrderList.push(eachData);
      })
    });
  }

  onClickAssigntoMe(invoiceNo: string) {
    
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo  =invoiceNo;

    this.orderService.assinOrder(this.requestMode).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Assign Order", "Order Assign Successfully.");
      } else {
        this.tostr.error("Assign Order", resp.message);
      }
    })
  }

}
