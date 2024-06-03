import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { CSOrder } from 'src/app/shared/models/CSOrder/csorder';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-cs-service-requests',
  templateUrl: './cs-service-requests.component.html',
  styleUrls: ['./cs-service-requests.component.css']
})
export class CsServiceRequestsComponent implements OnInit {

  subscription !: Subscription;
  requestMode = new Request();
  csOrderList: CSOrder[] = [];

  constructor(private orderService: OrderService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");

    this.subscription = timer(0, 30000).pipe(

      switchMap(() => this.orderService.getCSOrderList(this.requestMode))

    ).subscribe((result: any) => {
      this.csOrderList = [];
      const data = JSON.parse(JSON.stringify(result))

      data.data[0].forEach((eachData: CSOrder) => {
        const formatedDate = parseInt(eachData.createTime) * 1000;
        eachData.createTime = formatedDate.toString();

        this.csOrderList.push(eachData);
        console.log('data cs load>>>>>>>',this.csOrderList);
      })
    });
  }

  onClickAssignToMe(invoiceNo: string) {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = invoiceNo;
    this.requestMode.type = "CS";

    this.spinner.show();
    this.orderService.assinOrder(this.requestMode).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Order Assign", "Order Assign Successfully.");
        window.location.reload();
      } else {
        this.tostr.error("Order Assign", resp.message);
      }

      this.spinner.hide();
    })
  }

}
