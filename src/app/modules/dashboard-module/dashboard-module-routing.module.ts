import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { SelectServicesComponent } from './user/select-services/select-services.component';
import { SelectRequiredDocsComponent } from './user/select-required-docs/select-required-docs.component';
import { UploadRequiredDocsComponent } from './user/upload-required-docs/upload-required-docs.component';

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
            component: SelectRequiredDocsComponent
          },
          {
            path: 'step-02',
            component: UploadRequiredDocsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
