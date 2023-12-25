import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notary-order-process',
  templateUrl: './notary-order-process.component.html',
  styleUrls: ['./notary-order-process.component.css']
})
export class NotaryOrderProcessComponent implements OnInit {

  paymentForm!: FormGroup;
  invoiceNo!: string;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceId'];

    this.initPaymentForm();
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
      amountInArreas: ['', Validators.required]
    })
  }

}
