import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryDocument } from 'src/app/shared/models/NotaryDocument/notary-document';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-notary-order-process',
  templateUrl: './notary-order-process.component.html',
  styleUrls: ['./notary-order-process.component.css']
})
export class NotaryOrderProcessComponent implements OnInit {

  requestParamModel = new Request();
  firstDocList: any[] = [];
  secondDocList: any[] = [];
  thirdDocList: any[] = [];
  allDocumentTypes: string[] = [
    'NIC / Passport / Driving License / Adult Identity Card',
    'Extracts',
    'Deeds / Certificates of Title'
  ]
  showDocuments: any[] = [];
  isPaymentSet = false;
  notarydDocumentsList: File[] = [];
  uploadedDocuementList: NotaryDocument[] = [];
  isCustomerComplete = false;
  invoiceNo!: string;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private notaryService: NotaryService
            , private router: Router, private spinner: NgxSpinnerService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceId'];

    this.loadNotaryOrderInfo();
    this.getPaymentStatus();
    this.loadNotaryDocumentList();
  }

  onClickUpdateOrderStatus(orderStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.orderStatus = orderStatus;
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.spinner.show();
    this.notaryService.updateNotaryOrderStatus(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Update Order Status", "Order Status is Updated Successfully.");
      } else {
        this.tostr.error("Update Order Status", resp.message);
      }

      this.spinner.hide();
    })
  }

  onClickRemoveDocument(documentName: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.document = documentName;

    // this.notaryService.removeDocument(this.requestMode).subscribe((resp: any) => {

    //   if (resp.code === 1) {
        
    //   }
    // })
  }

  onClickViewDocument(documentName: string) {
    const filePath = environment.devServer + "notary_docs/" + documentName;
    window.open(filePath);
  }


  loadNotaryDocumentList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.getNotaryDocumentList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: NotaryDocument) => {
          this.uploadedDocuementList.push(eachRow);
        })
      }
    })
  }

  onChangeTranslatedDocs(event: any) {
    this.notarydDocumentsList = Array.from(event.target.files);;
  }

  onSubmitTranslatedDocuments() {
    const formData = new FormData();

    const authToken: any = sessionStorage.getItem("authToken");
    const flag: any = sessionStorage.getItem("role");

    formData.append("token", authToken);
    formData.append("flag", flag);
    formData.append("invoiceNo", this.invoiceNo);

    this.notarydDocumentsList.forEach((eachDoc: File, index) => {
      formData.append('translatedDoc' + index, eachDoc);
    })

    this.spinner.show();
    this.notaryService.submitNotasyDocuments(formData).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Submit Translated Documents.", "Document Uploading Successfully");
        location.reload();
      } else {
        this.tostr.error("Submit Translated Documents", resp.message);
      }

      this.spinner.hide();
    })
  }

  onClickSetPaymentInfo() {
    this.router.navigate(['/app/ns-order/set-pay-info', this.invoiceNo])
  }

  onClickViewImage(imageName: string) {
    const filePath = environment.fileServerURL + imageName;
    window.open(filePath)
  }

  onClickOpenDocTypeModel(index: number) {
    this.showDocuments = [];

    if (index == 1) {
      this.showDocuments.push(this.firstDocList[0]);
    } else if (index == 2) {
      this.showDocuments = this.secondDocList;
    } else {
      this.showDocuments = this.thirdDocList;
    }

    console.log(this.showDocuments)
  }

  loadNotaryOrderInfo() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.getNotaryOrderInfoByInvoice(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.firstDocList.push(dataList.data[0].firstDocType)
        this.secondDocList.push(dataList.data[0].secondDocType)
        this.thirdDocList.push(dataList.data[0].thirdDocType)

        if (dataList.data[0].isCustomerComplete == 1) {
          this.isCustomerComplete = true;
        }
      }
    })
  }

  getPaymentStatus() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.getNotaryOrderPayInfo(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.isPaymentSet = dataList.data[0].isOrderPaymentSet;
      }
    })
  }

}
