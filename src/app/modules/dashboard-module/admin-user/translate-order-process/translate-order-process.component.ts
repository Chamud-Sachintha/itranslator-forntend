import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { TaskService } from 'src/app/services/task/task.service';
import { BCTranslateModel } from 'src/app/shared/models/BCTranslateModel/bctranslate-model';
import { DCTranslateModel } from 'src/app/shared/models/DCTranslateModel/dctranslate-model';
import { MCTranslateModel } from 'src/app/shared/models/MCTranslateModel/mctranslate-model';
import { OrderMessage } from 'src/app/shared/models/OrderMessage/order-message';
import { Request } from 'src/app/shared/models/Request/request';
import { SchoolLeavingCertificateModel } from 'src/app/shared/models/SchoolLeavingCertificateModel/school-leaving-certificate-model';
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
  marriageTranslateForm!: FormGroup;
  deathTranslateForm!: FormGroup;
  otherDocumentTranslateForm!: FormGroup;
  affidavitForm!: FormGroup;
  schoolLeavingTranslateForm!: FormGroup;
  deedForm!: FormGroup;
  nicTranslateModelObj = new NICTranslator();
  bcTranslateModelObj = new BCTranslateModel();
  mcTranslateModelObj = new MCTranslateModel();
  dcTranslateModel = new DCTranslateModel();
  schoolLeavingTranslateModel = new SchoolLeavingCertificateModel();
  nicTranslateModel = false;
  bcTranslateModel = false;
  marriageTranslateModel = false;
  deathTranslateService = false;
  schoolLeaveTranslateService = false;
  otherDocumentTranslateService = false;
  affidavitTranslateionService = false;
  deedTranslationService = false;
  otherFormImagesList: string[] = [];
  affidavitImageList: string[] = [];
  deedImageList: string[] = [];

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
    this.marriageTranslateFormInit();
    this.initDCTranslateForm();
    this.initOtherDocumenTranslateForm();
    this.initSchoolLeavingCertificateForm();
    this.initAffidavitForm();
    this.initDeedForm();
  }

  onClickViewDocument(documentName: string) {
    const filePath = environment.devServer + documentName;
    window.open(filePath);
  }

  onClickRemoveDocument(documentName: string) {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.document = documentName;

    this.orderService.removeDocument(this.requestMode).subscribe((resp: any) => {

      if (resp.code === 1) {
        
      }
    })
  }

  initDeedForm() {
    this.deedForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      page1: ['', Validators.required],
      page2: ['', Validators.required],
      page3: ['', Validators.required],
      page4: ['', Validators.required],
      page5: ['', Validators.required],
      page6: ['', Validators.required]
    })
  }

  initAffidavitForm() {
    this.affidavitForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      descriptionOfService: ['', Validators.required],
      page1: ['', Validators.required],
      page2: ['', Validators.required],
      page3: ['', Validators.required],
      page4: ['', Validators.required],
      page5: ['', Validators.required]
    })
  }

  onClickViewSchoolLeavingFrontImage() {
    const imageUrl = environment.fileServerURL + this.schoolLeavingTranslateModel.frontImage;
    window.open(imageUrl);
  }

  onClickViewSchoolLeavingBackImage() {
    const imageUrl = environment.fileServerURL + this.schoolLeavingTranslateModel.backImage;
    window.open(imageUrl);
  }

  initSchoolLeavingCertificateForm() {
    this.schoolLeavingTranslateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      schoolName: ['', Validators.required],
      frontImage: ['', Validators.required],
      backImage: ['', Validators.required]
    })
  }

  onClickViewOtherImage(imageName: string) {
    const imageUrl = environment.fileServerURL + imageName;
    window.open(imageUrl);
  }

  initOtherDocumenTranslateForm() {
    this.otherDocumentTranslateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
      image3: ['', Validators.required],
      image4: ['', Validators.required],
      image5: ['', Validators.required],
      image6: ['', Validators.required],
    })
  }

  initDCTranslateForm() {
    this.deathTranslateForm = this.formBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onClickViewDCFrontImage() {
    const imageUrl = environment.fileServerURL + this.dcTranslateModel.frontImg;
    window.open(imageUrl);
  }

  onClickViewDCBackImage() {
    const imageUrl = environment.fileServerURL + this.dcTranslateModel.backImg;
    window.open(imageUrl);
  }

  onClickViewMCFrontImg() {
    const imageUrl = environment.fileServerURL + this.mcTranslateModelObj.frontImg;
    window.open(imageUrl);
  }

  onClickViewMCBackImg() {
    const imageUrl = environment.fileServerURL + this.mcTranslateModelObj.backImg;
    window.open(imageUrl);
  }

  marriageTranslateFormInit() {
    this.marriageTranslateForm = this.formBuilder.group({
      maleName: ['', Validators.required],
      maleFathersName: ['', Validators.required],
      maleResidence: ['', Validators.required],
      femaleName: ['', Validators.required],
      femaleFathersName: ['', Validators.required],
      femaleResidence: ['', Validators.required],
    })
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
    console.log(serviceId)
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");
    this.requestMode.invoiceNo = this.invoiceNo;
    this.requestMode.serviceId = serviceId;

    this.spinner.show();
    this.orderService.getOrderDocumentsByOrderAndService(this.requestMode).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {

        if (serviceId == "1") {
          this.nicTranslateModel = true;
          this.bcTranslateModel = false;
          this.deathTranslateService = false;
          this.marriageTranslateModel = false;

          this.nicTranslateModelForm.controls['nicName'].setValue(dataList.data[0].nicName);
          this.nicTranslateModelForm.controls['address'].setValue(dataList.data[0].address);
          this.nicTranslateModelForm.controls['birthPlace'].setValue(dataList.data[0].birthPlace);
          this.nicTranslateModelObj.frontImg = dataList.data[0].frontImg;
          this.nicTranslateModelObj.backImg = dataList.data[0].backImg;
        } else if (serviceId == "2") {
          this.nicTranslateModel = false;
          this.bcTranslateModel = true;
          this.deathTranslateService = false;
          this.marriageTranslateModel = false;

          this.bcTranslateModelForm.controls['name'].setValue(dataList.data[0].name);
          this.bcTranslateModelForm.controls['fatherName'].setValue(dataList.data[0].fatherName);
          this.bcTranslateModelForm.controls['motherName'].setValue(dataList.data[0].motherName);
          this.bcTranslateModelObj.frontImg = dataList.data[0].frontImage;
          this.bcTranslateModelObj.backImg = dataList.data[0].backImage;
        } else if (serviceId == "3") {
          this.nicTranslateModel = false;
          this.bcTranslateModel = false;
          this.marriageTranslateModel = true;
          this.deathTranslateService = false;

          this.marriageTranslateForm.controls['maleName'].setValue(dataList.data[0].maleName);
          this.marriageTranslateForm.controls['maleFathersName'].setValue(dataList.data[0].maleFathersName);
          this.marriageTranslateForm.controls['maleResidence'].setValue(dataList.data[0].maleResidence);

          this.marriageTranslateForm.controls['femaleName'].setValue(dataList.data[0].femaleName);
          this.marriageTranslateForm.controls['femaleFathersName'].setValue(dataList.data[0].femaleFathersName);
          this.marriageTranslateForm.controls['femaleResidence'].setValue(dataList.data[0].femaleResidence);
        } else if (serviceId == "4") {
          this.deathTranslateForm.controls['name'].setValue(dataList.data[0].name);
          this.deathTranslateForm.controls['fatherName'].setValue(dataList.data[0].fatherName);
          this.deathTranslateForm.controls['motherName'].setValue(dataList.data[0].motherName);
          this.dcTranslateModel.frontImg = dataList.data[0].frontImg;
          this.dcTranslateModel.backImg = dataList.data[0].backImg;
        } else if (serviceId == "5" || serviceId == "6" || serviceId == "8" || serviceId == "10" || serviceId == "11" || serviceId == "12" || serviceId == "14") {
          
          this.otherFormImagesList = [];

          this.nicTranslateModel = false;
          this.bcTranslateModel = false;
          this.deathTranslateService = false;
          this.marriageTranslateModel = false;
          this.otherDocumentTranslateService = true;

          this.otherDocumentTranslateForm.controls['fullName'].setValue(dataList.data[0].fullName);
          this.otherDocumentTranslateForm.controls['fatherName'].setValue(dataList.data[0].fatherName);
          this.otherDocumentTranslateForm.controls['motherName'].setValue(dataList.data[0].motherName);
  
          if ("page1" in dataList.data[0]) {
            this.otherFormImagesList.push(dataList.data[0].page1);
          }

          if ("page2" in dataList.data[0]) {
            this.otherFormImagesList.push(dataList.data[0].page2);
          }

          if ("page3" in dataList.data[0]) {
            this.otherFormImagesList.push(dataList.data[0].page3);
          }

          if ("page4" in dataList.data[0]) {
            this.otherFormImagesList.push(dataList.data[0].page4);
          }

          if ("page5" in dataList.data[0]) {
            this.otherFormImagesList.push(dataList.data[0].page5);
          }

          if ("page6" in dataList.data[0]) {
            this.otherFormImagesList.push(dataList.data[0].page6);
          }
        } else if (serviceId == "7") {
          this.nicTranslateModel = false;
          this.bcTranslateModel = false;
          this.deathTranslateService = false;
          this.marriageTranslateModel = false;
          this.otherDocumentTranslateService = false;
          this.schoolLeaveTranslateService = true;

          this.schoolLeavingTranslateForm.controls['fullName'].setValue(dataList.data[0].fullName);
          this.schoolLeavingTranslateForm.controls['schoolName'].setValue(dataList.data[0].schoolName);
          this.schoolLeavingTranslateModel.frontImage = dataList.data[0].frontImage;
          this.schoolLeavingTranslateModel.backImage = dataList.data[0].backImage;
        } else if (serviceId == "9") {

          this.affidavitImageList = [];

          this.nicTranslateModel = false;
          this.bcTranslateModel = false;
          this.deathTranslateService = false;
          this.marriageTranslateModel = false;
          this.otherDocumentTranslateService = false;
          this.schoolLeaveTranslateService = false;
          this.affidavitTranslateionService = true;

          this.affidavitForm.controls['fullName'].setValue(dataList.data[0].fullName);
          this.affidavitForm.controls['address'].setValue(dataList.data[0].address);
          this.affidavitForm.controls['descriptionOfService'].setValue(dataList.data[0].descriptionOfService);

          if ("page1" in dataList.data[0]) {
            this.affidavitImageList.push(dataList.data[0].page1);
          }

          if ("page2" in dataList.data[0]) {
            this.affidavitImageList.push(dataList.data[0].page2);
          }

          if ("page3" in dataList.data[0]) {
            this.affidavitImageList.push(dataList.data[0].page3);
          }

          if ("page4" in dataList.data[0]) {
            this.affidavitImageList.push(dataList.data[0].page4);
          }

          if ("page5" in dataList.data[0]) {
            this.affidavitImageList.push(dataList.data[0].page5);
          }

        } else if (serviceId == "13" || serviceId == "15") {

          this.deedImageList = [];

          this.nicTranslateModel = false;
          this.bcTranslateModel = false;
          this.deathTranslateService = false;
          this.marriageTranslateModel = false;
          this.otherDocumentTranslateService = false;
          this.schoolLeaveTranslateService = false;
          this.affidavitTranslateionService = false;
          this.deedTranslationService = true;

          this.deedForm.controls['fullName'].setValue(dataList.data[0].fullName);
          this.deedForm.controls['address'].setValue(dataList.data[0].address);
          
          if ("page1" in dataList.data[0]) {
            this.deedImageList.push(dataList.data[0].page1);
          }

          if ("page2" in dataList.data[0]) {
            this.deedImageList.push(dataList.data[0].page2);
          }

          if ("page3" in dataList.data[0]) {
            this.deedImageList.push(dataList.data[0].page3);
          }

          if ("page4" in dataList.data[0]) {
            this.deedImageList.push(dataList.data[0].page4);
          }

          if ("page5" in dataList.data[0]) {
            this.deedImageList.push(dataList.data[0].page5);
          }

          if ("page6" in dataList.data[0]) {
            this.deedImageList.push(dataList.data[0].page6);
          }
        }

        this.spinner.hide();
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
        location.reload();
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

    this.spinner.show();
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

      this.spinner.hide();
    })
  }

}
