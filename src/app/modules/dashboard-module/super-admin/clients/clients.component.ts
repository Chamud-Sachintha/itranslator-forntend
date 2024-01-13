import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { ClientInfo } from 'src/app/shared/models/ClientInfo/client-info';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  requestParamModel = new Request();
  clientInfoList: ClientInfo[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.loadClientList();
  }

  loadClientList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    
    this.commonService.getClientList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClient: ClientInfo) => {
          const formatedCreatedTime = parseInt(eachClient.createTime) * 1000;
          eachClient.createTime = formatedCreatedTime.toString();

          this.clientInfoList.push(eachClient);
        })
      }
    })
  }

}
