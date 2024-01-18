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
import { NotaryServiceComponent } from './super-admin/notary-service/notary-service.component';
import { TranslateOrderRequestsComponent } from './admin-user/translate-order-requests/translate-order-requests.component';
import { NotaryOrderRequestsComponent } from './admin-user/notary-order-requests/notary-order-requests.component';
import { TranslateTaskComponent } from './admin-user/translate-task/translate-task.component';
import { NotaryTaskComponent } from './admin-user/notary-task/notary-task.component';
import { TranslateOrderProcessComponent } from './admin-user/translate-order-process/translate-order-process.component';
import { NotaryOrderProcessComponent } from './admin-user/notary-order-process/notary-order-process.component';
import { OrderRequestsComponent } from './super-admin/order-requests/order-requests.component';
import { CheckOrderComponent } from './super-admin/check-order/check-order.component';
import { SetPaymentInfoComponent } from './admin-user/set-payment-info/set-payment-info.component';


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
    AddServiceComponent,
    NotaryServiceComponent,
    TranslateOrderRequestsComponent,
    NotaryOrderRequestsComponent,
    TranslateTaskComponent,
    NotaryTaskComponent,
    TranslateOrderProcessComponent,
    NotaryOrderProcessComponent,
    OrderRequestsComponent,
    CheckOrderComponent,
    SetPaymentInfoComponent,
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
