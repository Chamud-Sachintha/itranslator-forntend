import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';
import { Service } from 'src/app/shared/models/service/service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  serviceModel = new Service();
  addServiceForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.initAddServiceForm();
  }

  onSubmitCreateServiceForm() {
    const serviceName = this.addServiceForm.controls['serviceName'].value;
    const firstPrice = this.addServiceForm.controls['firstPrice'].value;
    const secondPrice = this.addServiceForm.controls['secondPrice'].value;
    const thirdPrice = this.addServiceForm.controls['thirdPrice'].value;
    const servicedescription = this.addServiceForm.controls['desciription'].value;

    if (serviceName == "") {

    } else if (firstPrice == "") {

    } else if (secondPrice == "") {

    } else if (thirdPrice == "") {

    } else {
      this.serviceModel.servicename = serviceName;
      this.serviceModel.firstPrice = firstPrice;
      this.serviceModel.secondPrice = secondPrice;
      this.serviceModel.thirdPrice = thirdPrice;
      this.serviceModel.description = servicedescription;

      this.serviceService.addNewService(this.serviceModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp)
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
