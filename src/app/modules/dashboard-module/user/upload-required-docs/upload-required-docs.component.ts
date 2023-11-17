import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
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
  nicTranslateService = false;
  nicFrontImage = null;
  nicBackImage = null;
  nicTranslatorModel = new NICTranslator();
  documentAppendModel = new DocumentAppend();
  appendDocList: DocumentAppend[] = [];

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location
            , private fromBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataShareService.getComponentValueObj().subscribe((data) => {
      if (data.length != 0) {
        this.selectedServiceList.push(data[0]);
        localStorage.setItem("selectedData", JSON.stringify(data[0]));
      } else if (localStorage.getItem("selectedData") != null) {
        const data: any = localStorage.getItem("selectedData");
        this.selectedServiceList.push(JSON.parse(data));
      }
    })

    if (this.selectedServiceList[0].serviceId == 1) {
      this.nicTranslateService = true;
    }

    this.initNicTranslateForm();
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
