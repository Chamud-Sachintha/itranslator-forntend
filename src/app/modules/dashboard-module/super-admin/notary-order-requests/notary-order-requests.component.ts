import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-notary-order-requests',
  templateUrl: './notary-order-requests.component.html',
  styleUrls: ['./notary-order-requests.component.css']
})
export class NotaryOrderRequestsComponent implements OnInit {

  requestModel = new Request();
  orderRequestList: OrderRequest[] = [];
  
  constructor(private spinner: NgxSpinnerService, private notaryService: NotaryService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllPendingNotaryOrderList();
  }

  onClickCheckOrder(invoiceNo: string) {
    this.router.navigate(['/app/check-order', invoiceNo]);
  }

  loadAllPendingNotaryOrderList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.notaryService.getNotaryOrdersPendingList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachOrder: OrderRequest) => {
          this.orderRequestList.push(eachOrder);
        })
      }
    })
  }

}
