import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { TaskService } from 'src/app/services/task/task.service';
import { BCTranslateModel } from 'src/app/shared/models/BCTranslateModel/bctranslate-model';
import { OrderMessage } from 'src/app/shared/models/OrderMessage/order-message';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateTask } from 'src/app/shared/models/TranslateTask/translate-task';
import { TranslatedDocument } from 'src/app/shared/models/TranslatedDocument/translated-document';
import { NICTranslator } from 'src/app/shared/models/TranslatorModel/nictranslator';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-translate-order-process',
  templateUrl: './translate-order-process.component.html',
  styleUrls: ['./translate-order-process.component.css']
})
export class TranslateOrderProcessComponent implements OnInit {

  subscription !: Subscription;
  requestMode = new Request();
  orderMessageList: OrderMessage[] = [];
  taskList: TranslateTask[] = [];
  invoiceNo!: string;
  translatedDocumentsList: File[] = [];
  uploadedDocuementList: TranslatedDocument[] = [];
  nicTranslateModelForm!: FormGroup;
  bcTranslateModelForm!: FormGroup;
  nicTranslateModelObj = new NICTranslator();
  bcTranslateModelObj = new BCTranslateModel();
  nicTranslateModel = false;
  bcTranslateModel = false;

  constructor(private activateRoute: ActivatedRoute, private orderService: OrderService, private taskService: TaskService
            , private tost: ToastrService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.invoiceNo = this.activateRoute.snapshot.params['invoiceId'];

    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");

    this.subscription = timer(0, 1500).pipe(

      switchMap(() => this.taskService.getOrderMessageList(this.requestMode))

    ).subscribe((result: any) => {
      this.orderMessageList = [];
      const dataList = JSON.parse(JSON.stringify(result))

      dataList.data[0].forEach((eachData: OrderMessage) => {
        const formatedDate = parseInt(eachData.time) * 1000;
        eachData.time = formatedDate.toString();

        this.orderMessageList.push(eachData);
      })
    });

    this.loadOrderRequestDetails();
    this.loadUploadedDocumentList();
    this.initNicTranslateModelForm();
    this.initBcTranslateModelForm();
  }

  loadOrderMessages() {
    this.requestMode.token
  }

  initBcTranslateModelForm() {
    this.bcTranslateModelForm = this.formBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['',Validators.required],
      backImg: ['', Validators.required]
    })

    this.bcTranslateModelForm.controls['name'].disable();
    this.bcTranslateModelForm.controls['fatherName'].disable();
    this.bcTranslateModelForm.controls['motherName'].disable();
  }

  onClickViewBcFrontImage() {
    const imageUrl = environment.fileServerURL + this.bcTranslateModelObj.frontImg;
    window.open(imageUrl);
  }

  onClickViewBcBackImage() {
    const imageUrl = environment.fileServerURL + this.bcTranslateModelObj.backImg;
    window.open(imageUrl);
  }

  onClickViewFrontImg() {
    const imageUrl = environment.fileServerURL + this.nicTranslateModelObj.frontImg;
    window.open(imageUrl);
  }

  onClickViewBackImg() {
    const imageUrl = environment.fileServerURL + this.nicTranslateModelObj.backImg;
    window.open(imageUrl);
  }

  initNicTranslateModelForm() {
    this.nicTranslateModelForm = this.formBuilder.group({
      nicName: ['', Validators.required],
      address: ['', Validators.required],
      birthPlace: ['', Validators.required]
    })

    this.nicTranslateModelForm.controls['nicName'].disable();
    this.nicTranslateModelForm.controls['address'].disable();
    this.nicTranslateModelForm.controls['birthPlace'].disable();
  }

  onClickOpenOrderDocuments(serviceId: string) {

    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = this.invoiceNo;
    this.requestMode.serviceId = serviceId;

    this.orderService.getOrderDocumentsByOrderAndService(this.requestMode).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {

        if (serviceId == "1") {
          this.nicTranslateModel = true;
          this.bcTranslateModel = false;

          this.nicTranslateModelForm.controls['nicName'].setValue(dataList.data[0].nicName);
          this.nicTranslateModelForm.controls['address'].setValue(dataList.data[0].address);
          this.nicTranslateModelForm.controls['birthPlace'].setValue(dataList.data[0].birthPlace);
          this.nicTranslateModelObj.frontImg = dataList.data[0].frontImg;
          this.nicTranslateModelObj.backImg = dataList.data[0].backImg;
        } else if (serviceId == "2") {
          this.nicTranslateModel = false;
          this.bcTranslateModel = true;

          this.bcTranslateModelForm.controls['name'].setValue(dataList.data[0].name);
          this.bcTranslateModelForm.controls['fatherName'].setValue(dataList.data[0].fatherName);
          this.bcTranslateModelForm.controls['motherName'].setValue(dataList.data[0].motherName);
          this.bcTranslateModelObj.frontImg = dataList.data[0].frontImage;
          this.bcTranslateModelObj.backImg = dataList.data[0].backImage;
        }

      }
    })
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
