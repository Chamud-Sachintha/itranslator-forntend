import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { BCTranslateModel } from 'src/app/shared/models/BCTranslateModel/bctranslate-model';
import { DocumentAppend } from 'src/app/shared/models/DocumentAppend/document-append';
import { PassporTranslateModel } from 'src/app/shared/models/PassportTranslateModel/passpor-translate-model';
import { NICTranslator } from 'src/app/shared/models/TranslatorModel/nictranslator';

@Component({
  selector: 'app-upload-required-docs',
  templateUrl: './upload-required-docs.component.html',
  styleUrls: ['./upload-required-docs.component.css'],
  providers: [DatePipe]
})
export class UploadRequiredDocsComponent implements OnInit {

  selectedServiceList: any[] = [];
  nicTranslateForm!: FormGroup;
  bcTranslateForm!: FormGroup;
  passportTranslateForm!: FormGroup;
  marriageTranslateForm!: FormGroup;
  deathTranslateForm!: FormGroup;
  schoolLeavingTranslateForm!: FormGroup;
  additionalInfoForm!: FormGroup;
  nicTranslateService = false;
  birthCertificateTranslateService = false;
  passportTranslateService = false;
  marriageTranslateService = false;
  deathTranslateService = false;
  schoolLeaveTranslateService = false;
  nicTranslatorModel = new NICTranslator();
  bcTranslateModel = new BCTranslateModel();
  passportTranslateModel = new PassporTranslateModel();
  documentAppendModel = new DocumentAppend();
  appendDocList: DocumentAppend[] = [];
  deliveryTime!: string;
  deliveryMethod!: string;
  paymentMethod!: string;

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location
            , private fromBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataShareService.getComponentValueObj().subscribe((data) => {
      this.selectedServiceList.push(data);
    })

    this.initNicTranslateForm();
    this.bcTranslateFormInit();
    this.passportTranslateFormInit();
    this.marriageTranslateFormInit();
    this.deathCertificateTranslateFormInit();
  }

  deathCertificateTranslateFormInit() {
    this.deathTranslateForm = this.fromBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onClickNextStep() {
    
    const completeDocObj = {
      uploadedDocList: this.appendDocList,
      deliveryTime: this.deliveryTime,
      deliveryMethod: this.deliveryMethod,
      paymentMethod: this.paymentMethod
    }

    this.dataShareService.setComponentValueObj(completeDocObj);
    this.router.navigate(['app/select-services/step-04']);
  }

  onSubmitMariageTranslateForm() {
    const maleName = this.marriageTranslateForm.controls['maleName'].value;
    const maleFatherName = this.marriageTranslateForm.controls['maleFathersName'].value;
    const maleResidence = this.marriageTranslateForm.controls['maleResidence'].value;
    const femaleName = this.marriageTranslateForm.controls['femaleName'].value;
    const femaleFathersName = this.marriageTranslateForm.controls['femaleFathersName'].value;
    const femaleResidence = this.marriageTranslateForm.controls['femaleResidence'].value;

    const frontImg = this.marriageTranslateForm.controls['frontImg'].value;
    const backImg = this.marriageTranslateForm.controls['backImg'].value;

    if (maleName == "") {

    } else if (maleFatherName == "") {

    } else if (maleResidence == "") {

    } else if (femaleName == "") {

    } else if (femaleFathersName == "") {

    } else if (femaleResidence == "") {

    } else if (frontImg == "") {

    } else if (backImg == "") {

    } else {
      
    }
  }

  marriageTranslateFormInit() {
    this.marriageTranslateForm = this.fromBuilder.group({
      maleName: ['', Validators.required],
      maleFathersName: ['', Validators.required],
      maleResidence: ['', Validators.required],
      femaleName: ['', Validators.required],
      femaleFathersName: ['', Validators.required],
      femaleResidence: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onChangeMariageFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.marriageTranslateForm.patchValue({"frontImg": file});
  }

  onChangeMariageBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.marriageTranslateForm.patchValue({"frontImg": file});
  }

  onChangePassportFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.passportTranslateForm.patchValue({"frontImg": file});
  }

  onChangePassportBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.passportTranslateForm.patchValue({"backImg": file});
  }

  passportTranslateFormInit() {
    this.passportTranslateForm = this.fromBuilder.group({
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onSubmitPassportTranslateForm() {
    const frontImg = this.passportTranslateForm.controls['frontImg'].value;
    const backImg = this.passportTranslateForm.controls['backImg'].value;

    if (frontImg == "") {

    } else if (backImg == "") {

    } else {
      this.passportTranslateModel.frontImg = frontImg;
      this.passportTranslateModel.backImg = backImg;

      this.documentAppendModel.passportTranslateModel = this.passportTranslateModel;
      this.documentAppendModel.translationTitle = "Passport Translation";
      this.documentAppendModel.submitedDate = new Date();

      this.appendDocList.push(this.documentAppendModel);
    }
  }

  onSubmitBirthCertificateTranslateForm() {
    const name = this.bcTranslateForm.controls['name'].value;
    const fatherName = this.bcTranslateForm.controls['fatherName'].value;
    const motherName = this.bcTranslateForm.controls['motherName'].value;

    if (name == "") {

    } else if (fatherName == "") {

    } else if (motherName == "") {

    } else {
      this.bcTranslateModel.name = name;
      this.bcTranslateModel.fatherName = fatherName;
      this.bcTranslateModel.motherName = motherName;

      let bcTranslateAppend = new DocumentAppend();

      bcTranslateAppend.bcTranslateModel = this.bcTranslateModel;
      bcTranslateAppend.translationTitle = "BC Translation";
      bcTranslateAppend.submitedDate = new Date();

      this.appendDocList.push(bcTranslateAppend);
    }
  }

  bcTranslateFormInit() {
    this.bcTranslateForm = this.fromBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required]
    })
  }

  setTranslateModalId(serviceId: number) {
    if (serviceId === 1) {
      this.nicTranslateService = true;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
    } else if (serviceId == 2) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = true;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
    } else if (serviceId == 3) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = true;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
    } else if (serviceId == 4) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = true;
      this.passportTranslateService = false;
      this.marriageTranslateService = true;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
    } else if (serviceId == 5) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = true;
      this.schoolLeaveTranslateService = false;
    } else if (serviceId == 6) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = true;
    }
  }

  onChangeFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.nicTranslateForm.patchValue({"frontImg": file});
  }

  onChangeBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.nicTranslateForm.patchValue({"backImg": file});
  }

  onSubmitNicTranslateForm() {
    const nicName = this.nicTranslateForm.controls['nicName'].value;
    const birthPlace = this.nicTranslateForm.controls['birthPlace'].value;
    const address = this.nicTranslateForm.controls['address'].value;
    const frontImg = this.nicTranslateForm.controls['frontImg'].value;
    const backImg = this.nicTranslateForm.controls['backImg'].value;

    if (nicName == "") {

    } else if (birthPlace == "") {

    } else if (address == "") {

    } else if (address == "") {

    } else if (frontImg == "") {

    } else if (backImg == "") {

    } else {
      this.nicTranslatorModel.nicName = nicName;
      this.nicTranslatorModel.birthPlace = birthPlace;
      this.nicTranslatorModel.address = address;
      this.nicTranslatorModel.frontImg = frontImg;
      this.nicTranslatorModel.backImg = backImg;

      let nicModelAppend = new DocumentAppend();

      nicModelAppend.nicTranslateModel = this.nicTranslatorModel;
      nicModelAppend.translationTitle = "NIC Translation";
      nicModelAppend.submitedDate = new Date();

      this.appendDocList.push(nicModelAppend);
    }

    return false;
  }

  initNicTranslateForm() {
    this.nicTranslateForm = this.fromBuilder.group({
      nicName: ['', Validators.required],
      birthPlace: ['', Validators.required],
      address: ['', Validators.required],
      frontImg: ['',Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onClickRemove() {
    localStorage.removeItem("selectedData");
    this.router.navigate(['app/select-services/step-02']);

    return false;
  }

  onClickPreviousBtn() {
    this.location.back();
  }

}
