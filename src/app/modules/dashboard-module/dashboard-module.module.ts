import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './user/home/home.component';
import { SelectServicesComponent } from './user/select-services/select-services.component';
import { SelectRequiredDocsComponent } from './user/select-required-docs/select-required-docs.component';
import { UploadRequiredDocsComponent } from './user/upload-required-docs/upload-required-docs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './user/invoice/invoice.component';
import { FinalComponent } from './user/final/final.component';
import { MainServicesComponent } from './user/main-services/main-services.component';
import { AdminUsersComponent } from './super-admin/admin-users/admin-users.component';
import { ClientsComponent } from './super-admin/clients/clients.component';
import { AddServiceComponent } from './super-admin/add-service/add-service.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    SelectServicesComponent,
    SelectRequiredDocsComponent,
    UploadRequiredDocsComponent,
    InvoiceComponent,
    FinalComponent,
    MainServicesComponent,
    AdminUsersComponent,
    ClientsComponent,
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class DashboardModuleModule { }
