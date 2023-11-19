import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { BCTranslateModel } from 'src/app/shared/models/BCTranslateModel/bctranslate-model';
import { DocumentAppend } from 'src/app/shared/models/DocumentAppend/document-append';
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
  nicTranslateService = false;
  birthCertificateTranslateService = false;
  nicFrontImage = null;
  nicBackImage = null;
  nicTranslatorModel = new NICTranslator();
  bcTranslateModel = new BCTranslateModel();
  documentAppendModel = new DocumentAppend();
  appendDocList: DocumentAppend[] = [];

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location
            , private fromBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataShareService.getComponentValueObj().subscribe((data) => {
      this.selectedServiceList.push(data);
    })

    this.initNicTranslateForm();
    this.bcTranslateFormInit();
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

      this.documentAppendModel.bcTranslateModel = this.bcTranslateModel;
      this.documentAppendModel.translationTitle = "BC Translation";
      this.documentAppendModel.submitedDate = new Date();

      this.appendDocList.push(this.documentAppendModel);
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
    } else if (serviceId == 2) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = true;
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

      this.documentAppendModel.nicTranslateModel = this.nicTranslatorModel;
      this.documentAppendModel.translationTitle = "NIC Translation";
      this.documentAppendModel.submitedDate = new Date();

      this.appendDocList.push(this.documentAppendModel);
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
