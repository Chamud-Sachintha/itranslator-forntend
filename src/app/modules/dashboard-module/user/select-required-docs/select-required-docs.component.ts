import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { Service } from 'src/app/shared/models/service/service';

@Component({
  selector: 'app-select-required-docs',
  templateUrl: './select-required-docs.component.html',
  styleUrls: ['./select-required-docs.component.css']
})
export class SelectRequiredDocsComponent implements OnInit {

  enableServiceList: Service[] = [];
  serviceModel = new Service();

  constructor(private router: Router, private dataShareService: DataShareService) {}

  ngOnInit() {
    
  }

  onChangeToggle(serviceId: number, value: any) {
    if (value.target.checked) {
      const requestServiceModel = {
        serviceId: serviceId,
        enable: true
      }

      this.enableServiceList.push(requestServiceModel);
    }
  }

  goToStep2() {
    this.dataShareService.setComponentValueObj(this.enableServiceList);
    this.router.navigate(['app/select-services/step-02'])
  }

}
