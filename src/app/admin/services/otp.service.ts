import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ApiService,
  Config,
  OTPModel
} from '../index';

@Injectable()
export class OTPService {
  controllerName = Config.url.ecomLocalUrl + "Admin";

  constructor(private apiSvc: ApiService) { }

  sendOTP(mobileNo: string, email: string): Observable<any> {
    try {
      return this.apiSvc.executeQuery(`${this.controllerName}/SendOTP`, { mobileNo: mobileNo, email: email });
    } catch (e) {
      throw e;
    }
  }

  confirmOTP(userOTPID: number, otp: string): Observable<any> {
    try {
      return this.apiSvc.executeQuery(`${this.controllerName}/VerifyOTP`, { userOTPID: userOTPID, otp: otp });
    } catch (e) {
      throw e;
    }
  }
}

@Injectable()
export class OTPModelService {
  oTPModel: OTPModel;
  isSubmitted: boolean = false;
  isTimeCount: boolean = false;
  interval: any;
  oTPForm: UntypedFormGroup;
  constructor() {
  }
}




