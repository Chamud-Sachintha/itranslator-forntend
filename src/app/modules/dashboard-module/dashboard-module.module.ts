import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './user/home/home.component';
import { SelectServicesComponent } from './user/select-services/select-services.component';
import { SelectRequiredDocsComponent } from './user/select-required-docs/select-required-docs.component';
import { UploadRequiredDocsComponent } from './user/upload-required-docs/upload-required-docs.component';
import { FormsModule } from '@angular/forms';
import { InvoiceComponent } from './user/invoice/invoice.component';
import { FinalComponent } from './user/final/final.component';


@NgModule({
  declarations: [
    HomeComponent,
    SelectServicesComponent,
    SelectRequiredDocsComponent,
    UploadRequiredDocsComponent,
    InvoiceComponent,
    FinalComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule
  ]
})
export class DashboardModuleModule { }
