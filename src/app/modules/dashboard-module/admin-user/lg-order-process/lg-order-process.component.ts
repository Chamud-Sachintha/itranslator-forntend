import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { CSOrder } from 'src/app/shared/models/CSOrder/csorder';
import { Request } from 'src/app/shared/models/Request/request';


@Component({
  selector: 'app-lg-order-process',
  templateUrl: './lg-order-process.component.html',
  styleUrls: ['./lg-order-process.component.css']
})
export class LgOrderProcessComponent implements OnInit {
  selectedOrder: any;
  isVisible:boolean = false;
  requestMode = new Request();
  lgOrderList: any [] = []
  adminLessageList:any[] =[];
  subscription !: Subscription;
  requestParamModel = new Request();
  lgForm!: FormGroup;
  model:boolean = false;

  constructor(private orderService: OrderService, private fb: FormBuilder, private tostr: ToastrService, private spinner: NgxSpinnerService) {}
 
  ngOnInit(): void {
   this.getlegaltask();
   this.lgForm = this.fb.group({
    message: [''],
    Doc: [null]
  });
  }

  getlegaltask(){
    this.spinner.show();

    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
   
    this.orderService.getLgTaskList(this.requestMode).subscribe((resp: any) => {
      this.lgOrderList = resp.data[0];
      this.lgOrderList.forEach(order => {
        order.createTime = new Date(order.createTime * 1000); 
      });
      console.log('data>>>', this.lgOrderList);
      
      this.spinner.hide();
    })
  }


  openModal(order: string): void {
    this.isVisible = true;
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.OrderNo = order;


    this.subscription = timer(0, 6000).pipe(

      switchMap(() => this.orderService.getOrderMessageList(this.requestMode))

    ).subscribe((result: any) => {
      this.adminLessageList = [];
      const dataList = JSON.parse(JSON.stringify(result))

      dataList.data[0].forEach((eachData: any) => {
       /* const formatedDate = parseInt(eachData.time) * 1000;
        eachData.time = formatedDate.toString();*/

        this.adminLessageList.push(eachData);
      })
    });
  }

  onSubmitAddPersonForm(){

  }


  sendOrderMessageToAdmin() {
    if (this.lgForm.invalid) {
      this.tostr.error('Please fill in the message and attach files if necessary.');
      return;
    }

    const formData = new FormData();
    formData.append('token', sessionStorage.getItem("authToken") || '');
    formData.append('flag', sessionStorage.getItem("role") || '');
    formData.append('OrderNo', this.requestMode.OrderNo || '');
    formData.append('message', this.lgForm.get('message')?.value);

    const files: File[] = this.lgForm.get('Doc')?.value || [];
    files.forEach((file, index) => {
      formData.append(`Doc[${index}]`, file);
    });

    this.orderService.sendAdminLegalMessage(formData).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.tostr.success("Send Admin Message", "Message Sent Successfully.");
       // this.tostr.success("Order Assign", "Order Assign Successfully.");
        this.isVisible = false;
        this.model = false;
        this.lgForm.reset();
        this.adminLessageList.push({
          fromUser: 'You',
          time: new Date(),
          message: formData.get('message')
        });
      } else {
        this.tostr.error("Send Admin Message", resp.message);
      }
    }, () => {
      this.tostr.error("Send Admin Message", "An error occurred while sending the message.");
    });
  }

  

  onChangeSecondDoc($event: any) {
        const files = $event.target.files;
        if (this.lgForm && files) { 
            this.lgForm.get('Doc')?.setValue(Array.from(files)); 
      }
  }
}
