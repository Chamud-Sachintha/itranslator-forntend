import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order/order.service';
import { TaskService } from 'src/app/services/task/task.service';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateTask } from 'src/app/shared/models/TranslateTask/translate-task';
import { TranslatedDocument } from 'src/app/shared/models/TranslatedDocument/translated-document';

@Component({
  selector: 'app-translate-order-process',
  templateUrl: './translate-order-process.component.html',
  styleUrls: ['./translate-order-process.component.css']
})
export class TranslateOrderProcessComponent implements OnInit {

  requestMode = new Request();
  taskList: TranslateTask[] = [];
  invoiceNo!: string;
  translatedDocumentsList: File[] = [];
  uploadedDocuementList: TranslatedDocument[] = [];

  constructor(private activateRoute: ActivatedRoute, private orderService: OrderService, private taskService: TaskService
            , private tost: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activateRoute.snapshot.params['invoiceId'];

    this.loadOrderRequestDetails();
    this.loadUploadedDocumentList();
  }

  sendAdminMessage(message: string) {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = this.invoiceNo;
    this.requestMode.message = message;

    this.taskService.sendAdminOrderMessage(this.requestMode).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tost.success("Send Admin Message", "Message Sent Successfully.");
      } else {
        this.tost.error("Send Admin Message", resp.message);
      }
    })
  }

  loadUploadedDocumentList() {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = this.invoiceNo;

    this.taskService.getUploadedDocsByOrder(this.requestMode).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: TranslatedDocument) => {
          this.uploadedDocuementList.push(eachRow);
        })
      }
    })
  }

  onChangeTranslatedDocs(event: any) {
    this.translatedDocumentsList = Array.from(event.target.files);;
  }

  onSubmitTranslatedDocuments() {
    const formData = new FormData();

    const authToken: any = sessionStorage.getItem("authToken");
    const flag: any = sessionStorage.getItem("role");

    formData.append("token", authToken);
    formData.append("flag", flag);
    formData.append("invoiceNo", this.invoiceNo);

    this.translatedDocumentsList.forEach((eachDoc: File, index) => {
      formData.append('translatedDoc' + index, eachDoc);
    })

    this.spinner.show();
    this.taskService.uploadTranslatedDocuments(formData).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tost.success("Submit Translated Documents.", "Document Uploading Successfully");
      } else {
        this.tost.error("Submit Translated Documents", resp.message);
      }

      this.spinner.hide();
    })
  }

  loadOrderRequestDetails() {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = this.invoiceNo;
    this.requestMode.type = "TR";

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
