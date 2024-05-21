import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { CSOrder } from 'src/app/shared/models/CSOrder/csorder';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-lg-order-request',
  templateUrl: './lg-order-request.component.html',
  styleUrls: ['./lg-order-request.component.css']
})
export class LgOrderRequestComponent implements OnInit  {

  requestMode = new Request();
  lgOrderList: any [] = []
  constructor(private orderService: OrderService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
   this.getlgOrders();
  }

  getlgOrders(){
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
   

    this.spinner.show();
    this.orderService.getLgOrderList(this.requestMode).subscribe((resp: any) => {
      this.lgOrderList = resp.data[0];
      this.lgOrderList.forEach(order => {
        order.createTime = new Date(order.createTime * 1000); 
      });
      console.log('data>>>', this.lgOrderList);
      
      this.spinner.hide();
    })
  }


  onClickAssignToMe(OrderNo: any){
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.OrderNo = OrderNo;
   // this.requestMode.type = "CS";

    this.spinner.show();
    this.orderService.assinLgOrder(this.requestMode).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.tostr.success("Order Assign", "Order Assign Successfully.");
      } else {
        this.tostr.error("Order Assign", resp.message);
      }
      this.getlgOrders();
      this.spinner.hide();
    })
  }

}
