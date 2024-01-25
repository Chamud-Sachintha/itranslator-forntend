import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CsService } from 'src/app/services/cs/cs.service';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-cs-order-process',
  templateUrl: './cs-order-process.component.html',
  styleUrls: ['./cs-order-process.component.css']
})
export class CsOrderProcessComponent implements OnInit {

  firstServiceForm!: FormGroup;
  secondServiceForm!: FormGroup;
  thirdServiceForm!: FormGroup;
  fourthServiceForm!: FormGroup;
  fifthServiceForm!: FormGroup;
  sixthServiceForm!: FormGroup;
  sevenServiceForm!: FormGroup;
  requestParamModel = new Request();
  firstServiceFormModel = false;
  secondServiceFormModel = false;
  thirdServiceFormModel = false;
  forthServiceFormModel = false;
  fifthServiceFormModel = false;
  sixthServiceFormModel = false;
  seventhServiceFormModel = false;

  firstServiceRequiredDocList: any[] = [];
  firstServiceNICImages: any[] = [];
  secondServiceDocs: any[] = [];
  thirdServiceDocList: any[] = [];
  thirdServiceIntentLetter: any;
  forthServiceDocList: any[] = [];
  forthServiceResignLetter: any;
  fifthServiceDocList: any[] = [];
  sixthServiceDocList: any[] = [];
  isPaymentSet = false;
  invoiceNo!: string;

  constructor(private activatedRoute: ActivatedRoute, private csService: CsService, private formBuilder: FormBuilder
            , private router: Router) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceNo'];

    this.loadOrderInfoByInvoice();
    this.initFirstServiceForm();
    this.initSecondServiceForm();
    this.initThirdServiceForm();
    this.initForthServiceForm();
    this.initFifthServiceForm();
    this.initSixthServiceForm();
    this.initSevenServiceForm();
  }

  onClickSetPaymentInfo() {
    this.router.navigate(['/app/ns-order/set-pay-info', this.invoiceNo])
  }

  initFirstServiceForm() {
    this.firstServiceForm = this.formBuilder.group({
      companyName: ['' ,Validators.required],
      directorNames: ['', Validators.required],
      directorAddress: ['', Validators.required],
      directorTelephones: ['', Validators.required],
      directorEmails: ['', Validators.required],
      devisionNumber: ['', Validators.required],
      devisionalSectrial: ['' ,Validators.required],
      directorDistrict: ['', Validators.required],
      nicNumberOfDirectors: ['', Validators.required]
    })
  }

  initSecondServiceForm() {
    this.secondServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  initThirdServiceForm() {
    this.thirdServiceForm = this.formBuilder.group({
      companyName: ['' ,Validators.required],
      directorNames: ['', Validators.required],
      directorAddress: ['', Validators.required],
      directorTelephones: ['', Validators.required],
      directorEmails: ['', Validators.required],
      devisionNumber: ['', Validators.required],
      devisionalSectrial: ['' ,Validators.required],
      directorDistrict: ['', Validators.required],
      nicNumberOfDirectors: ['', Validators.required],
      dateOfAppointment: ['', Validators.required]
    })
  }

  initForthServiceForm() {
    this.fourthServiceForm = this.formBuilder.group({
      companyName: ['' ,Validators.required],
      directorNames: ['', Validators.required],
      directorAddress: ['', Validators.required],
      directorTelephones: ['', Validators.required],
      directorEmails: ['', Validators.required],
      devisionNumber: ['', Validators.required],
      devisionalSectrial: ['' ,Validators.required],
      directorDistrict: ['', Validators.required],
      nicNumberOfDirectors: ['', Validators.required],
      dateOfResign: ['', Validators.required]
    })
  }

  initFifthServiceForm() {
    this.fifthServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  initSixthServiceForm() {
    this.sixthServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  initSevenServiceForm() {
    this.secondServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  loadOrderInfoByInvoice() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.csService.getOrderInfoByInvoice(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        const serviceIndex = dataList.data[0].serviceId;

        if (serviceIndex == 1) {
          this.firstServiceFormModel = true;

          this.firstServiceForm.controls['companyName'].setValue(dataList.data[0].jsonValue.companyName);
          this.firstServiceForm.controls['directorNames'].setValue(dataList.data[0].jsonValue.directorName);
          this.firstServiceForm.controls['directorAddress'].setValue(dataList.data[0].jsonValue.directorAddress);
          this.firstServiceForm.controls['directorTelephones'].setValue(dataList.data[0].jsonValue.directorTelephone);
          this.firstServiceForm.controls['directorEmails'].setValue(dataList.data[0].jsonValue.directorEmail);
          this.firstServiceForm.controls['devisionNumber'].setValue(dataList.data[0].jsonValue.devisionNumber);
          this.firstServiceForm.controls['devisionalSectrial'].setValue(dataList.data[0].jsonValue.devisionalSectrial);
          this.firstServiceForm.controls['directorDistrict'].setValue(dataList.data[0].jsonValue.directorDistrict);
          this.firstServiceForm.controls['nicNumberOfDirectors'].setValue(dataList.data[0].jsonValue.nicNumberOfDirectors);

          dataList.data[0].jsonValue.nic.forEach((eachDoc: any) => {
            this.firstServiceNICImages.push(eachDoc)
          })

          dataList.data[0].jsonValue.doc.forEach((eachDoc: any) => {
            this.firstServiceRequiredDocList.push(eachDoc)
          })

        } else if (serviceIndex == 2) {
          this.secondServiceFormModel = true;

          this.secondServiceForm.controls['companyName'].setValue(dataList.data[0].jsonValue.companyName);
          this.secondServiceForm.controls['regNumber'].setValue(dataList.data[0].jsonValue.regNumber);
          this.secondServiceForm.controls['description'].setValue(dataList.data[0].jsonValue.description);

          dataList.data[0].jsonValue.doc.forEach((eachDoc: any) => {
            this.secondServiceDocs.push(eachDoc)
          })
        } else if (serviceIndex == 3) {
          this.thirdServiceFormModel = true;

          this.thirdServiceForm.controls['companyName'].setValue(dataList.data[0].jsonValue.companyName);
          this.thirdServiceForm.controls['directorNames'].setValue(dataList.data[0].jsonValue.directorName);
          this.thirdServiceForm.controls['directorAddress'].setValue(dataList.data[0].jsonValue.directorAddress);
          this.thirdServiceForm.controls['directorTelephones'].setValue(dataList.data[0].jsonValue.directorTelephone);
          this.thirdServiceForm.controls['directorEmails'].setValue(dataList.data[0].jsonValue.directorEmail);
          this.thirdServiceForm.controls['devisionNumber'].setValue(dataList.data[0].jsonValue.devisionNumber);
          this.thirdServiceForm.controls['devisionalSectrial'].setValue(dataList.data[0].jsonValue.devisionalSectrial);
          this.thirdServiceForm.controls['directorDistrict'].setValue(dataList.data[0].jsonValue.directorDistrict);
          this.thirdServiceForm.controls['nicNumberOfDirectors'].setValue(dataList.data[0].jsonValue.nicNumberOfDirectors);
          this.thirdServiceForm.controls['dateOfAppointment'].setValue(dataList.data[0].jsonValue.dateOfAppointment);

          this.thirdServiceIntentLetter = dataList.data[0].jsonValue.intent;

          dataList.data[0].jsonValue.doc.forEach((eachDoc: any) => {
            this.thirdServiceDocList.push(eachDoc)
          })
        } else if (serviceIndex == 4) {
          this.forthServiceFormModel = true;

          this.thirdServiceForm.controls['companyName'].setValue(dataList.data[0].jsonValue.companyName);
          this.thirdServiceForm.controls['directorNames'].setValue(dataList.data[0].jsonValue.directorName);
          this.thirdServiceForm.controls['directorAddress'].setValue(dataList.data[0].jsonValue.directorAddress);
          this.thirdServiceForm.controls['directorTelephones'].setValue(dataList.data[0].jsonValue.directorTelephone);
          this.thirdServiceForm.controls['directorEmails'].setValue(dataList.data[0].jsonValue.directorEmail);
          this.thirdServiceForm.controls['devisionNumber'].setValue(dataList.data[0].jsonValue.devisionNumber);
          this.thirdServiceForm.controls['devisionalSectrial'].setValue(dataList.data[0].jsonValue.devisionalSectrial);
          this.thirdServiceForm.controls['directorDistrict'].setValue(dataList.data[0].jsonValue.directorDistrict);
          this.thirdServiceForm.controls['nicNumberOfDirectors'].setValue(dataList.data[0].jsonValue.nicNumberOfDirectors);
          this.thirdServiceForm.controls['dateOfResign'].setValue(dataList.data[0].jsonValue.dateOfResign);

          this.forthServiceResignLetter = dataList.data[0].jsonValue.resign;

          dataList.data[0].jsonValue.doc.forEach((eachDoc: any) => {
            this.forthServiceDocList.push(eachDoc)
          })
        } else if (serviceIndex == 5) {
          this.fifthServiceFormModel = true;

          this.fifthServiceForm.controls['companyName'].setValue(dataList.data[0].jsonValue.companyName);
          this.fifthServiceForm.controls['regNumber'].setValue(dataList.data[0].jsonValue.regNumber);
          this.fifthServiceForm.controls['description'].setValue(dataList.data[0].jsonValue.description);

          dataList.data[0].jsonValue.doc.forEach((eachDoc: any) => {
            this.fifthServiceDocList.push(eachDoc)
          })
        } else if (serviceIndex == 6) {
          this.sixthServiceFormModel = true;

          this.sixthServiceForm.controls['companyName'].setValue(dataList.data[0].jsonValue.companyName);
          this.sixthServiceForm.controls['regNumber'].setValue(dataList.data[0].jsonValue.regNumber);
          this.sixthServiceForm.controls['description'].setValue(dataList.data[0].jsonValue.description);

          dataList.data[0].jsonValue.doc.forEach((eachDoc: any) => {
            this.sixthServiceDocList.push(eachDoc)
          })
        } else if (serviceIndex == 7) {
          this.seventhServiceFormModel = true;

          this.sevenServiceForm.controls['companyName'].setValue(dataList.data[0].jsonValue.companyName);
          this.sevenServiceForm.controls['regNumber'].setValue(dataList.data[0].jsonValue.regNumber);
          this.sevenServiceForm.controls['description'].setValue(dataList.data[0].jsonValue.description);
        } else {

        }
      }
    })
  }

  onClickViewImage(eachDoc: any) {
    const filePath = environment.csServiceFileUrl + eachDoc;
    window.open(filePath);
  }

}
