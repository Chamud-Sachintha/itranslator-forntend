import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CsService } from 'src/app/services/cs/cs.service';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { CSPaymentLog } from 'src/app/shared/models/CSPaymentLog/cspayment-log';
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
  csPaymentLog = new CSPaymentLog();
  paymentForm!: FormGroup;
  csPaymentForm!: FormGroup;
  csServiceForm = false;
  invoiceNo!: string;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private notaryService: NotaryService
              , private router: Router, private tostr: ToastrService, private csService: CsService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceNo'];

    const ext = this.invoiceNo.split("-");

    this.initPaymentForm();
    this.initCsPaymentForm();

    if (ext[0] == "CS") {
      this.csServiceForm = true;

      this.getCsPaymentInfo();
    } else {
      this.getPaymentInfo();
    }
  }

  onSubmitCsPaymentLogForm() {
    const companyNameApproval = this.csPaymentForm.controls['companyNameApproval'].value;
    const form1 = this.csPaymentForm.controls['form1'].value;
    const form10 = this.csPaymentForm.controls['form10'].value;
    const form13 = this.csPaymentForm.controls['form13'].value;
    const form15 = this.csPaymentForm.controls['form15'].value;
    const form18 = this.csPaymentForm.controls['form18'].value;
    const form19 = this.csPaymentForm.controls['form19'].value;
    const form20 = this.csPaymentForm.controls['form20'].value;
    const copyCharges = this.csPaymentForm.controls['copyCharges'].value;
    const articleFees = this.csPaymentForm.controls['articleFees'].value;
    const amendmendFees = this.csPaymentForm.controls['amendmendFees'].value;
    const annualFees = this.csPaymentForm.controls['annualFees'].value;
    const panalties = this.csPaymentForm.controls['panalties'].value;
    const other = this.csPaymentForm.controls['other'].value;
    const govStampDuty = this.csPaymentForm.controls['govStampDuty'].value;
    const writenSettlementFees = this.csPaymentForm.controls['writenSettlementFees'].value;
    const transpotationFees = this.csPaymentForm.controls['transpotationFees'].value;
    const companySecFees = this.csPaymentForm.controls['companySecFees'].value;
    const expServiceCharges = this.csPaymentForm.controls['expServiceCharges'].value;
    const refCommision = this.csPaymentForm.controls['refCommision'].value;
    const postageCharge = this.csPaymentForm.controls['postageCharge'].value;
    const stampDuty = this.csPaymentForm.controls['stampDuty'].value;

    // const fullChargeOfServiceProvision= this.csPaymentForm.controls['fullChargeOfServiceProvision'].value;
    const firstAdvance= this.csPaymentForm.controls['firstAdvance'].value;
    const secondAdvance= this.csPaymentForm.controls['secondAdvance'].value;
    const thirdAdvance= this.csPaymentForm.controls['thirdAdvance'].value;
    const forthAdvance= this.csPaymentForm.controls['forthAdvance'].value;
    const fifthAdvance= this.csPaymentForm.controls['fifthAdvance'].value;
    const finalPayment= this.csPaymentForm.controls['finalPayment'].value;
    const amountInArreas= this.csPaymentForm.controls['amountInArreas'].value;
    const descriptionOfService= this.csPaymentForm.controls['descriptionOfService'].value;
    const pickUpDate= this.csPaymentForm.controls['pickUpDate'].value;
    const dateOfSubmission= this.csPaymentForm.controls['dateOfSubmission'].value;
    const dateOfMailing= this.csPaymentForm.controls['dateOfMailing'].value;
    const dateOfRegistration= this.csPaymentForm.controls['dateOfRegistration'].value;
    var totalAmount = this.csPaymentForm.controls['fullChargeOfServiceProvision'].value;

    this.csPaymentLog.token = sessionStorage.getItem("authToken");
    this.csPaymentLog.flag = sessionStorage.getItem("role");
    this.csPaymentLog.invoiceNo = this.invoiceNo;
    this.csPaymentLog.companyNameApproval = companyNameApproval;
    this.csPaymentLog.form1 = form1;
    this.csPaymentLog.form10 = form10;
    this.csPaymentLog.form13 = form13;
    this.csPaymentLog.form15 = form15;
    this.csPaymentLog.form18 = form18;
    this.csPaymentLog.form19 = form19
    this.csPaymentLog.form20 = form20;
    this.csPaymentLog.copyCharges = copyCharges;
    this.csPaymentLog.articleFees = articleFees;
    this.csPaymentLog.amendmendFees = amendmendFees;
    this.csPaymentLog.annualFees = annualFees;
    this.csPaymentLog.panalties = panalties;
    this.csPaymentLog.other = other;
    this.csPaymentLog.govStampDuty = govStampDuty;
    this.csPaymentLog.transportFees = transpotationFees;
    this.csPaymentLog.companySecFees = companySecFees;
    this.csPaymentLog.expServiceCharges = expServiceCharges;
    this.csPaymentLog.refCommision = refCommision;
    this.csPaymentLog.postageCharge = postageCharge;
    // this.csPaymentLog.fullChargeOfServiceProvision = fullChargeOfServiceProvision;
    this.csPaymentLog.firstAdvance = firstAdvance;
    this.csPaymentLog.secondAdvance = secondAdvance;
    this.csPaymentLog.thirdAdvance = thirdAdvance;
    this.csPaymentLog.forthAdvance = forthAdvance;
    this.csPaymentLog.fifthAdvance = fifthAdvance;
    this.csPaymentLog.finalPayment = finalPayment;
    this.csPaymentLog.amountInArreas = amountInArreas;
    this.csPaymentLog.descriptionOfService = descriptionOfService;
    this.csPaymentLog.pickUpDate = pickUpDate;
    this.csPaymentLog.dateOfSubmission = dateOfSubmission;
    this.csPaymentLog.dateOfMailing = dateOfMailing;
    this.csPaymentLog.dateOfRegistration = dateOfRegistration;
    this.csPaymentLog.stampDuty = stampDuty;
    this.csPaymentLog.totalAmount = totalAmount;

    this.csService.addPaymentLog(this.csPaymentLog).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Add Payment Log", "Payment Log Added Successfully.");
        //this.csPaymentForm.reset();
        window.location.reload(); 
      } else {
        this.tostr.error("Add Payemt Log", resp.message)
      }
    })
  }

  setCsPayTotalAmount() {
    const companyNameApproval = this.validateNaN(parseFloat(this.csPaymentForm.controls['companyNameApproval'].value));
    const form1 = this.validateNaN(parseFloat(this.csPaymentForm.controls['form1'].value));
    const form10 = this.validateNaN(parseFloat(this.csPaymentForm.controls['form10'].value));
    const form13 = this.validateNaN(parseFloat(this.csPaymentForm.controls['form13'].value));
    const form15 = this.validateNaN(parseFloat(this.csPaymentForm.controls['form15'].value));
    const form18 = this.validateNaN(parseFloat(this.csPaymentForm.controls['form18'].value));
    const form19 = this.validateNaN(parseFloat(this.csPaymentForm.controls['form19'].value));
    const form20 = this.validateNaN(parseFloat(this.csPaymentForm.controls['form20'].value));
    const copyCharges = this.validateNaN(parseFloat(this.csPaymentForm.controls['copyCharges'].value));
    const articleFees = this.validateNaN(parseFloat(this.csPaymentForm.controls['articleFees'].value));
    const amendmendFees = this.validateNaN(parseFloat(this.csPaymentForm.controls['amendmendFees'].value));
    const annualFees = this.validateNaN(parseFloat(this.csPaymentForm.controls['annualFees'].value));
    const panalties = this.validateNaN(parseFloat(this.csPaymentForm.controls['panalties'].value));
    const other = this.validateNaN(parseFloat(this.csPaymentForm.controls['other'].value));
    const govStampDuty = this.validateNaN(parseFloat(this.csPaymentForm.controls['govStampDuty'].value));
    const writenSettlementFees = this.validateNaN(parseFloat(this.csPaymentForm.controls['writenSettlementFees'].value));
    const transpotationFees = this.validateNaN(parseFloat(this.csPaymentForm.controls['transpotationFees'].value));
    const companySecFees = this.validateNaN(parseFloat(this.csPaymentForm.controls['companySecFees'].value));
    const expServiceCharges = this.validateNaN(parseFloat(this.csPaymentForm.controls['expServiceCharges'].value));
    const refCommision = this.validateNaN(parseFloat(this.csPaymentForm.controls['refCommision'].value));
    const postageCharge = this.validateNaN(parseFloat(this.csPaymentForm.controls['postageCharge'].value));
    const stampDuty = this.validateNaN(parseFloat(this.csPaymentForm.controls['stampDuty'].value));

    const totalAmount = companyNameApproval + form1 + form10 + form13 + form15 + form18 + form19 + form20 
                          + copyCharges + articleFees + amendmendFees + annualFees + + panalties + other +
                          + govStampDuty + writenSettlementFees + transpotationFees + companySecFees + expServiceCharges + refCommision + postageCharge
                          + stampDuty;

    
    this.csPaymentForm.controls['fullChargeOfServiceProvision'].setValue(totalAmount);
  }

  initCsPaymentForm() {
    this.csPaymentForm = this.formBuilder.group({
      companyNameApproval: ['', Validators.required],
      form1: ['', Validators.required],
      form10: ['', Validators.required],
      form13: ['', Validators.required],
      form15: ['', Validators.required],
      form18: ['', Validators.required],
      form19: ['', Validators.required],
      form20: ['', Validators.required],
      copyCharges: ['', Validators.required],
      articleFees: ['', Validators.required],
      amendmendFees: ['', Validators.required],
      annualFees: ['', Validators.required],
      panalties: ['', Validators.required],
      other: ['', Validators.required],
      govStampDuty: ['', Validators.required],
      writenSettlementFees: ['', Validators.required],
      transpotationFees: ['', Validators.required],
      companySecFees: ['', Validators.required],
      expServiceCharges: ['', Validators.required],
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
  }

  getCsPaymentInfo() {
    this.csPaymentForm.controls['amountInArreas'].disable();
    this.csPaymentForm.controls['fullChargeOfServiceProvision'].disable();

    this.requestParamMdel.token = sessionStorage.getItem("authToken");
    this.requestParamMdel.flag = sessionStorage.getItem("role");
    this.requestParamMdel.invoiceNo = this.invoiceNo;

    this.csService.getCsOrderPaymentStatus(this.requestParamMdel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        const isPaymentSet = dataList.data[0].isOrderPaymentSet;

        if (isPaymentSet) {
          
          this.csPaymentForm.controls['companyNameApproval'].setValue(dataList.data[0].companyNameApproval);
          this.csPaymentForm.controls['form1'].setValue(dataList.data[0].form1);
          this.csPaymentForm.controls['form10'].setValue(dataList.data[0].form10);
          this.csPaymentForm.controls['form13'].setValue(dataList.data[0].form13);
          this.csPaymentForm.controls['form15'].setValue(dataList.data[0].form15);
          this.csPaymentForm.controls['form18'].setValue(dataList.data[0].form18);
          this.csPaymentForm.controls['form19'].setValue(dataList.data[0].form19);
          this.csPaymentForm.controls['form20'].setValue(dataList.data[0].form20);
          this.csPaymentForm.controls['copyCharges'].setValue(dataList.data[0].copyCharges);
          this.csPaymentForm.controls['articleFees'].setValue(dataList.data[0].articleFees);
          this.csPaymentForm.controls['amendmendFees'].setValue(dataList.data[0].amendmendFees);
          this.csPaymentForm.controls['annualFees'].setValue(dataList.data[0].annualFees);
          this.csPaymentForm.controls['panalties'].setValue(dataList.data[0].panalties);
          this.csPaymentForm.controls['other'].setValue(dataList.data[0].other);
          this.csPaymentForm.controls['govStampDuty'].setValue(dataList.data[0].govStampDuty);
          this.csPaymentForm.controls['transpotationFees'].setValue(dataList.data[0].transpotationFees);
          this.csPaymentForm.controls['expServiceCharges'].setValue(dataList.data[0].expServiceCharges);

          this.csPaymentForm.controls['refCommision'].setValue(dataList.data[0].refCommision);
          this.csPaymentForm.controls['postageCharge'].setValue(dataList.data[0].postageCharge);
          // this.csPaymentForm.controls['fullChargeOfServiceProvision'].setValue(dataList.data[0].fullChargeOfServiceProvision);
          this.csPaymentForm.controls['firstAdvance'].setValue(dataList.data[0].firstAdvance);
          this.csPaymentForm.controls['secondAdvance'].setValue(dataList.data[0].secondAdvance);
          this.csPaymentForm.controls['thirdAdvance'].setValue(dataList.data[0].thirdAdvance);
          this.csPaymentForm.controls['forthAdvance'].setValue(dataList.data[0].forthAdvance);
          this.csPaymentForm.controls['fifthAdvance'].setValue(dataList.data[0].fifthAdvance);
          this.csPaymentForm.controls['finalPayment'].setValue(dataList.data[0].finalPayment);
          this.csPaymentForm.controls['amountInArreas'].setValue(dataList.data[0].amountInArreas);
          this.csPaymentForm.controls['descriptionOfService'].setValue(dataList.data[0].descriptionOfService)
          this.csPaymentForm.controls['pickUpDate'].setValue(dataList.data[0].pickUpDate);
          this.csPaymentForm.controls['dateOfSubmission'].setValue(dataList.data[0].dateOfSubmission);
          this.csPaymentForm.controls['dateOfMailing'].setValue(dataList.data[0].dateOfMailing);
          this.csPaymentForm.controls['dateOfRegistration'].setValue(dataList.data[0].dateOfRegistration)
          this.csPaymentForm.controls['stampDuty'].setValue(dataList.data[0].stampDuty);
          this.csPaymentForm.controls['fullChargeOfServiceProvision'].setValue(dataList.data[0].totalAmount);
        }
      }
    })
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
        this.tostr.success("Add Payment log", "Payment Log Added");
        this.router.navigate(['/app/ns-order', this.invoiceNo]);
      } else {
        this.tostr.error("Add Payment log", resp.message);
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

  onInputChange(event: Event){
    const inputValue = this.validateNaN(parseFloat(this.csPaymentForm.controls['firstAdvance'].value));
    const totalAmount = this.validateNaN(parseFloat(this.csPaymentForm.controls['fullChargeOfServiceProvision'].value));

    const Arriesamount = totalAmount - inputValue ;
    this.csPaymentForm.controls['amountInArreas'].setValue(Arriesamount);
    console.log('Input value changed:', Arriesamount);
  }

  onInputChange2(event: Event){
    const inputValue1 = this.validateNaN(parseFloat(this.csPaymentForm.controls['firstAdvance'].value));
    const inputValue2 = this.validateNaN(parseFloat(this.csPaymentForm.controls['secondAdvance'].value));
    const totalAmount = this.validateNaN(parseFloat(this.csPaymentForm.controls['fullChargeOfServiceProvision'].value));

    const Arriesamount = totalAmount - inputValue1 - inputValue2 ;
    this.csPaymentForm.controls['amountInArreas'].setValue(Arriesamount);
    console.log('Input value changed:', Arriesamount);
  }

  onInputChange3(event: Event){
    const inputValue1 = this.validateNaN(parseFloat(this.csPaymentForm.controls['firstAdvance'].value));
    const inputValue2 = this.validateNaN(parseFloat(this.csPaymentForm.controls['secondAdvance'].value));
    const inputValue3 = this.validateNaN(parseFloat(this.csPaymentForm.controls['thirdAdvance'].value));
    const totalAmount = this.validateNaN(parseFloat(this.csPaymentForm.controls['fullChargeOfServiceProvision'].value));

    const Arriesamount = totalAmount - inputValue1 - inputValue2 - inputValue3 ;
    this.csPaymentForm.controls['amountInArreas'].setValue(Arriesamount);
    console.log('Input value changed:', Arriesamount);
  }

  onInputChange4(event: Event){
    const inputValue1 = this.validateNaN(parseFloat(this.csPaymentForm.controls['firstAdvance'].value));
    const inputValue2 = this.validateNaN(parseFloat(this.csPaymentForm.controls['secondAdvance'].value));
    const inputValue3= this.validateNaN(parseFloat(this.csPaymentForm.controls['thirdAdvance'].value));
    const inputValue4 = this.validateNaN(parseFloat(this.csPaymentForm.controls['forthAdvance'].value));
    const totalAmount = this.validateNaN(parseFloat(this.csPaymentForm.controls['fullChargeOfServiceProvision'].value));

    const Arriesamount = totalAmount - inputValue1 - inputValue2 - inputValue3 - inputValue4 ;
    this.csPaymentForm.controls['amountInArreas'].setValue(Arriesamount);
    console.log('Input value changed:', Arriesamount);
  }

  onInputChange5(event: Event){
    const inputValue1 = this.validateNaN(parseFloat(this.csPaymentForm.controls['firstAdvance'].value));
    const inputValue2 = this.validateNaN(parseFloat(this.csPaymentForm.controls['secondAdvance'].value));
    const inputValue3 = this.validateNaN(parseFloat(this.csPaymentForm.controls['thirdAdvance'].value));
    const inputValue4 = this.validateNaN(parseFloat(this.csPaymentForm.controls['forthAdvance'].value));
    const inputValue5 = this.validateNaN(parseFloat(this.csPaymentForm.controls['fifthAdvance'].value));
    const totalAmount = this.validateNaN(parseFloat(this.csPaymentForm.controls['fullChargeOfServiceProvision'].value));

    const Arriesamount = totalAmount - inputValue1 - inputValue2 - inputValue3 - inputValue4 - inputValue5 ;
    this.csPaymentForm.controls['amountInArreas'].setValue(Arriesamount);
    console.log('Input value changed:', Arriesamount);
  }

  onInputChange6(event: Event){
    const inputValue1 = this.validateNaN(parseFloat(this.csPaymentForm.controls['firstAdvance'].value));
    const inputValue2= this.validateNaN(parseFloat(this.csPaymentForm.controls['secondAdvance'].value));
    const inputValue3 = this.validateNaN(parseFloat(this.csPaymentForm.controls['thirdAdvance'].value));
    const inputValue4 = this.validateNaN(parseFloat(this.csPaymentForm.controls['forthAdvance'].value));
    const inputValue5 = this.validateNaN(parseFloat(this.csPaymentForm.controls['fifthAdvance'].value));
    const inputValue6 = this.validateNaN(parseFloat(this.csPaymentForm.controls['finalPayment'].value));
    const totalAmount = this.validateNaN(parseFloat(this.csPaymentForm.controls['fullChargeOfServiceProvision'].value));

    const Arriesamount = totalAmount - inputValue1 - inputValue2 - inputValue3 - inputValue4 - inputValue5 - inputValue6 ;
    this.csPaymentForm.controls['amountInArreas'].setValue(Arriesamount);
    console.log('Input value changed:', Arriesamount);
  }

}
