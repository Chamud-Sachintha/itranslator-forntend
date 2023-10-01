import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';

@Component({
  selector: 'app-upload-required-docs',
  templateUrl: './upload-required-docs.component.html',
  styleUrls: ['./upload-required-docs.component.css']
})
export class UploadRequiredDocsComponent implements OnInit {

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location) {}

  ngOnInit() {
    this.dataShareService.getComponentValueObj().subscribe((data) => {
      console.log(data)
    })
  }

  onClickPreviousBtn() {
    this.location.back();
  }

}
