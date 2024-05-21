import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './super-admin/home/home.component';
import { SelectServicesComponent } from './user/select-services/select-services.component';
import { SelectRequiredDocsComponent } from './user/select-required-docs/select-required-docs.component';
import { UploadRequiredDocsComponent } from './user/upload-required-docs/upload-required-docs.component';
import { MainServicesComponent } from './user/main-services/main-services.component';
import { AdminUsersComponent } from './super-admin/admin-users/admin-users.component';
import { ClientsComponent } from './super-admin/clients/clients.component';
import { AddServiceComponent } from './super-admin/add-service/add-service.component';
import { InvoiceComponent } from './user/invoice/invoice.component';
import { NotaryServiceComponent } from './super-admin/notary-service/notary-service.component';
import { TranslateOrderRequestsComponent } from './admin-user/translate-order-requests/translate-order-requests.component';
import { SuperAdminGuard } from 'src/app/guards/super-admin/super-admin.guard';
import { NotaryOrderRequestsComponent } from './admin-user/notary-order-requests/notary-order-requests.component';
import { NotaryOrderRequestsComponent as NSORSA } from './super-admin/notary-order-requests/notary-order-requests.component';
import { TranslateTaskComponent } from './admin-user/translate-task/translate-task.component';
import { TranslateOrderProcessComponent } from './admin-user/translate-order-process/translate-order-process.component';
import { NotaryTaskComponent } from './admin-user/notary-task/notary-task.component';
import { NotaryOrderProcessComponent } from './admin-user/notary-order-process/notary-order-process.component';
import { OrderRequestsComponent } from './super-admin/order-requests/order-requests.component';
import { CheckOrderComponent } from './super-admin/check-order/check-order.component';
import { SetPaymentInfoComponent } from './admin-user/set-payment-info/set-payment-info.component';
import { CsServiceRequestsComponent } from './admin-user/cs-service-requests/cs-service-requests.component';
import { CsTaskComponent } from './admin-user/cs-task/cs-task.component';
import { CsOrderProcessComponent } from './admin-user/cs-order-process/cs-order-process.component';
import { CompleteTrOrdersComponent } from './admin-user/complete-tr-orders/complete-tr-orders.component';
import { CompleteNsOrdersComponent } from './admin-user/complete-ns-orders/complete-ns-orders.component';
import { CompleteCsOrdersComponent } from './admin-user/complete-cs-orders/complete-cs-orders.component';
import { LgOrderRequestComponent} from './admin-user/lg-order-request/lg-order-request.component';
import { LgOrderProcessComponent } from './admin-user/lg-order-process/lg-order-process.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'select-services',
        component: SelectServicesComponent,
        children: [
          {
            path: '',
            redirectTo: 'step-01',
            pathMatch: 'full'
          },
          {
            path: 'step-01',
            component: MainServicesComponent
          },
          {
            path: 'step-02',
            component: SelectRequiredDocsComponent
          },
          {
            path: 'step-03',
            component: UploadRequiredDocsComponent
          },
          {
            path: 'step-04',
            component: InvoiceComponent
          }
        ]
      },

      // admin user menu paths

      {
        path: 'translate-orders',
        component: TranslateOrderRequestsComponent
      },
      {
        path: 'notary-orders',
        component: NotaryOrderRequestsComponent
      },
      {
        path: 'cs-orders',
        component: CsServiceRequestsComponent
      },
      {
        path: 'lg-orders',
        component: LgOrderRequestComponent
      },
      {
        path: 'tr-task-list',
        component: TranslateTaskComponent
      },
      {
        path: 'ns-task-list',
        component: NotaryTaskComponent
      },
      {
        path: 'cs-task-list',
        component: CsTaskComponent
      },
      {
        path: 'lg-task-list',
        component: LgOrderProcessComponent
      },
      {
        path: 'tr-order/:invoiceId',
        component: TranslateOrderProcessComponent
      },
      {
        path: 'ns-order/:invoiceId',
        component: NotaryOrderProcessComponent
      },
      {
        path: 'cs-order/:invoiceNo',
        component: CsOrderProcessComponent
      },
      {
        path: 'ns-order/set-pay-info/:invoiceNo',
        component: SetPaymentInfoComponent
      },
      {
        path: 'complete-tr-orders',
        component: CompleteTrOrdersComponent
      },
      {
        path: 'complete-order-requests',
        component: CompleteNsOrdersComponent
      },
      {
        path: 'complete-cs-order-requests',
        component: CompleteCsOrdersComponent
      },

      // super admin menu paths

      {
        path: 'admin-users',
        component: AdminUsersComponent,
        canActivate: [SuperAdminGuard]
      },
      {
        path: 'client-management',
        component: ClientsComponent
      },
      {
        path: 'service-management',
        component: AddServiceComponent
      },
      {
        path: 'notary-service',
        component: NotaryServiceComponent
      },
      {
        path: 'order-requests',
        component: OrderRequestsComponent
      },
      {
        path: 'notary-order-requests',
        component: NSORSA
      },
      {
        path: 'check-order/:invoiceNo',
        component: CheckOrderComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
