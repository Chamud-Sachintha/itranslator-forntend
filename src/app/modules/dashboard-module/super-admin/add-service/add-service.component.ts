import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';
import { Service } from 'src/app/shared/models/service/service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  serviceModel = new Service();
  requestMode = new Request();
  translateServiceList: Service[] = [];
  addServiceForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private serviceService: ServiceService
            , private tost: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initAddServiceForm();
    this.getAllTranslateServiceList();
  }

  getAllTranslateServiceList() {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.flag = sessionStorage.getItem("role");

    this.serviceService.getServiceList(this.requestMode).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachService: Service) => {
          this.translateServiceList.push(eachService)
        }) 
      }
    })
  }

  onSubmitCreateServiceForm() {
    const serviceName = this.addServiceForm.controls['serviceName'].value;
    const firstPrice = this.addServiceForm.controls['firstPrice'].value;
    const secondPrice = this.addServiceForm.controls['secondPrice'].value;
    const thirdPrice = this.addServiceForm.controls['thirdPrice'].value;
    const servicedescription = this.addServiceForm.controls['description'].value;

    if (serviceName == "") {

    } else if (firstPrice == "") {

    } else if (secondPrice == "") {

    } else if (thirdPrice == "") {

    } else {
      this.serviceModel.serviceName = serviceName;
      this.serviceModel.firstPrice = firstPrice;
      this.serviceModel.secondPrice = secondPrice;
      this.serviceModel.thirdPrice = thirdPrice;
      this.serviceModel.description = servicedescription;
      this.serviceModel.token = sessionStorage.getItem("authToken");
      this.serviceModel.flag = sessionStorage.getItem("role");

      this.spinner.show();
      this.serviceService.addNewService(this.serviceModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tost.success("Add New Service", "Service Added Successfully.");
          this.spinner.hide();
        }
      }, (err) => {})
    }
  }

  initAddServiceForm() {
    this.addServiceForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      firstPrice: ['', Validators.required],
      secondPrice: ['', Validators.required],
      thirdPrice: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

}
