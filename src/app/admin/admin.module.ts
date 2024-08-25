import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

import {
  ApiService,
  ForgotpasswordComponent,
  ChangePasswordComponent,
  SignupComponent,
  ConfirmOtpComponent,
  MobileNoModalComponent
} from './index';

@NgModule({
  declarations: [
    DashboardComponent,
    ForgotpasswordComponent,
    ConfirmOtpComponent,
    ChangePasswordComponent,
    SignupComponent,
    MobileNoModalComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
],
  exports: [
    ForgotpasswordComponent,
    ConfirmOtpComponent,
    ChangePasswordComponent,
    SignupComponent
  ],
  providers: [ApiService]
})
export class AdminModule { }


