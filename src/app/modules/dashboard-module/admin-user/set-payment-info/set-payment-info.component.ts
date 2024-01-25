import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryPaymentLog } from 'src/app/shared/models/NotaryPaymentLog/notary-payment-log';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-set-payment-info',
  templateUrl: './set-payment-info.component.html',
  styleUrls: ['./set-payment-info.component.css']
})
export class SetPaymentInfoComponent implements OnInit {

  requestParamMdel = new Request();
  notaryPaymentLogModel = new NotaryPaymentLog();
  paymentForm!: FormGroup;
  invoiceNo!: string;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private notaryService: NotaryService
              , private router: Router) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceNo'];

    this.initPaymentForm();
    this.getPaymentInfo();
  }

  getPaymentInfo() {

    this.paymentForm.controls['amountInArreas'].disable();

    this.requestParamMdel.token = sessionStorage.getItem("authToken");
    this.requestParamMdel.flag = sessionStorage.getItem("role");
    this.requestParamMdel.invoiceNo = this.invoiceNo;

    this.notaryService.getNotaryOrderPayInfo(this.requestParamMdel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        const isPaymentSet = dataList.data[0].isOrderPaymentSet;

        if (isPaymentSet) {
          this.paymentForm.controls['extSearch'].setValue(dataList.data[0].extSearch);
          this.paymentForm.controls['secondCopyCheck'].setValue(dataList.data[0].secondCopyCheck);
          this.paymentForm.controls['obtainExt'].setValue(dataList.data[0].obtainExt);
          this.paymentForm.controls['obtainSecondCpyTaking'].setValue(dataList.data[0].obtainSecondCpyTaking)
          this.paymentForm.controls['prepOfTitle'].setValue(dataList.data[0].prepOfTitle);
          this.paymentForm.controls['photographyFees'].setValue(dataList.data[0].photographyFees);
          this.paymentForm.controls['govStampDuty'].setValue(dataList.data[0].govStampDuty);
          this.paymentForm.controls['regFees'].setValue(dataList.data[0].regFees);
          this.paymentForm.controls['transpotationFees'].setValue(dataList.data[0].transpotationFees)
          this.paymentForm.controls['notaryFees'].setValue(dataList.data[0].notaryFees);
          this.paymentForm.controls['expServiceCharge'].setValue(dataList.data[0].expServiceCharge);
          this.paymentForm.controls['refCommision'].setValue(dataList.data[0].refCommision);
          this.paymentForm.controls['postageCharge'].setValue(dataList.data[0].postageCharge);
          this.paymentForm.controls['fullChargeOfServiceProvision'].setValue(dataList.data[0].fullChargeOfServiceProvision);
          this.paymentForm.controls['firstAdvance'].setValue(dataList.data[0].firstAdvance);
          this.paymentForm.controls['secondAdvance'].setValue(dataList.data[0].secondAdvance);
          this.paymentForm.controls['thirdAdvance'].setValue(dataList.data[0].thirdAdvance);
          this.paymentForm.controls['forthAdvance'].setValue(dataList.data[0].forthAdvance);
          this.paymentForm.controls['fifthAdvance'].setValue(dataList.data[0].fifthAdvance);
          this.paymentForm.controls['finalPayment'].setValue(dataList.data[0].finalPayment);
          this.paymentForm.controls['amountInArreas'].setValue(dataList.data[0].amountInArreas);
          this.paymentForm.controls['descriptionOfService'].setValue(dataList.data[0].descriptionOfService)
          this.paymentForm.controls['pickUpDate'].setValue(dataList.data[0].pickUpDate);
          this.paymentForm.controls['dateOfSubmission'].setValue(dataList.data[0].dateOfSubmission);
          this.paymentForm.controls['dateOfMailing'].setValue(dataList.data[0].dateOfMailing);
          this.paymentForm.controls['dateOfRegistration'].setValue(dataList.data[0].dateOfRegistration)
          this.paymentForm.controls['stampDuty'].setValue(dataList.data[0].stampDuty);
          this.paymentForm.controls['totalAmount'].setValue(dataList.data[0].totalAmount);
        }
      }
    })
  }

  onClickBackBtn() {
    this.router.navigate(['/app/ns-order', this.invoiceNo]);
  }

  validateNaN(input: any) {
    if (isNaN(input)) {
      return 0;
    } else {
      return input;
    }
  }

  onClickSetTotalAmount() {
    const extSearch=  this.validateNaN(parseFloat(this.paymentForm.controls['extSearch'].value));
    const secondCopyCheck= this.validateNaN(parseFloat(this.paymentForm.controls['secondCopyCheck'].value));
    const obtainExt= this.validateNaN(parseFloat(this.paymentForm.controls['obtainExt'].value));
    const obtainSecondCpyTaking= this.validateNaN(parseFloat(this.paymentForm.controls['obtainSecondCpyTaking'].value));
    const prepOfTitle= this.validateNaN(parseFloat(this.paymentForm.controls['prepOfTitle'].value));
    const photographyFees= this.validateNaN(parseFloat(this.paymentForm.controls['photographyFees'].value));
    const govStampDuty= this.validateNaN(parseFloat(this.paymentForm.controls['govStampDuty'].value));
    const regFees= this.validateNaN(parseFloat(this.paymentForm.controls['regFees'].value));
    const transpotationFees= this.validateNaN(parseFloat(this.paymentForm.controls['transpotationFees'].value));
    const notaryFees= this.validateNaN(parseFloat(this.paymentForm.controls['notaryFees'].value));
    const expServiceCharge= this.validateNaN(parseFloat(this.paymentForm.controls['expServiceCharge'].value));
    const refCommision= this.validateNaN(parseFloat(this.paymentForm.controls['refCommision'].value));
    const postageCharge= this.validateNaN(parseFloat(this.paymentForm.controls['postageCharge'].value));
    const fullChargeOfServiceProvision= this.validateNaN(parseFloat(this.paymentForm.controls['fullChargeOfServiceProvision'].value));
    const firstAdvance= this.validateNaN(parseFloat(this.paymentForm.controls['firstAdvance'].value));
    const secondAdvance= this.validateNaN(parseFloat(this.paymentForm.controls['secondAdvance'].value));
    const thirdAdvance= this.validateNaN(parseFloat(this.paymentForm.controls['thirdAdvance'].value));
    const forthAdvance= this.validateNaN(parseFloat(this.paymentForm.controls['forthAdvance'].value));
    const fifthAdvance= this.validateNaN(parseFloat(this.paymentForm.controls['fifthAdvance'].value));
    const finalPayment= this.validateNaN(parseFloat(this.paymentForm.controls['finalPayment'].value));
    const amountInArreas= this.validateNaN(parseFloat(this.paymentForm.controls['amountInArreas'].value));
    const stampDuty = this.validateNaN(parseFloat(this.paymentForm.controls['stampDuty'].value));

    const totalAmount = extSearch + secondCopyCheck + obtainExt + obtainSecondCpyTaking + prepOfTitle + photographyFees + govStampDuty 
                          + regFees + transpotationFees + notaryFees + expServiceCharge + refCommision + postageCharge
                          + fullChargeOfServiceProvision + stampDuty;

    
    this.paymentForm.controls['totalAmount'].setValue(totalAmount);

    return false;
  }

  onSubmitPaymentLogForm() {
    const extSearch= this.paymentForm.controls['extSearch'].value;
    const secondCopyCheck= this.paymentForm.controls['secondCopyCheck'].value;
    const obtainExt= this.paymentForm.controls['obtainExt'].value;
    const obtainSecondCpyTaking= this.paymentForm.controls['obtainSecondCpyTaking'].value;
    const prepOfTitle= this.paymentForm.controls['prepOfTitle'].value;
    const photographyFees= this.paymentForm.controls['photographyFees'].value;
    const govStampDuty= this.paymentForm.controls['govStampDuty'].value;
    const regFees= this.paymentForm.controls['regFees'].value;
    const transpotationFees= this.paymentForm.controls['transpotationFees'].value;
    const notaryFees= this.paymentForm.controls['notaryFees'].value;
    const expServiceCharge= this.paymentForm.controls['expServiceCharge'].value;
    const refCommision= this.paymentForm.controls['refCommision'].value;
    const postageCharge= this.paymentForm.controls['postageCharge'].value;
    const fullChargeOfServiceProvision= this.paymentForm.controls['fullChargeOfServiceProvision'].value;
    const firstAdvance= this.paymentForm.controls['firstAdvance'].value;
    const secondAdvance= this.paymentForm.controls['secondAdvance'].value;
    const thirdAdvance= this.paymentForm.controls['thirdAdvance'].value;
    const forthAdvance= this.paymentForm.controls['forthAdvance'].value;
    const fifthAdvance= this.paymentForm.controls['fifthAdvance'].value;
    const finalPayment= this.paymentForm.controls['finalPayment'].value;
    const amountInArreas= this.paymentForm.controls['amountInArreas'].value;
    const descriptionOfService= this.paymentForm.controls['descriptionOfService'].value;
    const pickUpDate= this.paymentForm.controls['pickUpDate'].value;
    const dateOfSubmission= this.paymentForm.controls['dateOfSubmission'].value;
    const dateOfMailing= this.paymentForm.controls['dateOfMailing'].value;
    const dateOfRegistration= this.paymentForm.controls['dateOfRegistration'].value;
    const stampDuty = this.paymentForm.controls['stampDuty'].value;
    var totalAmount = this.paymentForm.controls['totalAmount'].value;

    this.notaryPaymentLogModel.token = sessionStorage.getItem("authToken");
    this.notaryPaymentLogModel.flag = sessionStorage.getItem("role");
    this.notaryPaymentLogModel.invoiceNo = this.invoiceNo;
    this.notaryPaymentLogModel.extSearch = extSearch;
    this.notaryPaymentLogModel.secondCopyCheck = secondCopyCheck;
    this.notaryPaymentLogModel.obtainExt = obtainExt;
    this.notaryPaymentLogModel.obtainSecondCpyTaking = obtainSecondCpyTaking;
    this.notaryPaymentLogModel.prepOfTitle = prepOfTitle;
    this.notaryPaymentLogModel.photographyFees = photographyFees;
    this.notaryPaymentLogModel.govStampDuty = govStampDuty;
    this.notaryPaymentLogModel.regFees = regFees;
    this.notaryPaymentLogModel.transpotationFees = transpotationFees;
    this.notaryPaymentLogModel.notaryFees = notaryFees;
    this.notaryPaymentLogModel.expServiceCharge = expServiceCharge;
    this.notaryPaymentLogModel.refCommision = refCommision;
    this.notaryPaymentLogModel.postageCharge = postageCharge;
    this.notaryPaymentLogModel.fullChargeOfServiceProvision = fullChargeOfServiceProvision;
    this.notaryPaymentLogModel.firstAdvance = firstAdvance;
    this.notaryPaymentLogModel.secondAdvance = secondAdvance;
    this.notaryPaymentLogModel.thirdAdvance = thirdAdvance;
    this.notaryPaymentLogModel.forthAdvance = forthAdvance;
    this.notaryPaymentLogModel.fifthAdvance = fifthAdvance;
    this.notaryPaymentLogModel.finalPayment = finalPayment;
    this.notaryPaymentLogModel.amountInArreas = amountInArreas;
    this.notaryPaymentLogModel.descriptionOfService = descriptionOfService;
    this.notaryPaymentLogModel.pickUpDate = pickUpDate;
    this.notaryPaymentLogModel.dateOfSubmission = dateOfSubmission;
    this.notaryPaymentLogModel.dateOfMailing = dateOfMailing;
    this.notaryPaymentLogModel.dateOfRegistration = dateOfRegistration;
    this.notaryPaymentLogModel.stampDuty = stampDuty;
    this.notaryPaymentLogModel.totalAmount = totalAmount;

    if (totalAmount == 0) {
      totalAmount = "0.00";
    }

    this.notaryService.addPaymentLog(this.notaryPaymentLogModel).subscribe((resp: any) => {

      if (resp.code === 1) {

      }
    })
  }

  initPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      extSearch: ['', Validators.required],
      secondCopyCheck: ['', Validators.required],
      obtainExt: ['', Validators.required],
      obtainSecondCpyTaking: ['', Validators.required],
      prepOfTitle: ['', Validators.required],
      photographyFees: ['', Validators.required],
      govStampDuty: ['', Validators.required],
      regFees: ['', Validators.required],
      transpotationFees: ['', Validators.required],
      notaryFees: ['', Validators.required],
      expServiceCharge: ['', Validators.required],
      refCommision: ['', Validators.required],
      postageCharge: ['', Validators.required],
      fullChargeOfServiceProvision: ['', Validators.required],
      firstAdvance: ['', Validators.required],
      secondAdvance: ['', Validators.required],
      thirdAdvance: ['', Validators.required],
      forthAdvance: ['', Validators.required],
      fifthAdvance: ['', Validators.required],
      finalPayment: ['', Validators.required],
      amountInArreas: ['', Validators.required],
      descriptionOfService: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      dateOfSubmission: ['', Validators.required],
      dateOfMailing: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      stampDuty: ['', Validators.required],
      totalAmount: ['', Validators.required]
    })

    this.paymentForm.controls['totalAmount'].disable();
  }

}
