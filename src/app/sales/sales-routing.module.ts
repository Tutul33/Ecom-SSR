import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CustomerProfileComponent 
} from './index';

const routes: Routes = [
  { path: 'customer-profile', component: CustomerProfileComponent, data: { breadcrumb: 'Customer Profile' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule { }

