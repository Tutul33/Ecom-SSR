
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AdminService } from 'src/app/app-shared/services/admin.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { FixedIDs } from 'src/app/shared';
import { forgotPasswordValidation } from '../models/sign-up-in.model';

import {
  ProviderService,
  BaseComponent,
  ValidatorDirective,
  SignUpInDataService,
  SignUpInModelService,
  ModalService,
  ModalConfig,
  ConfirmOtpComponent,
  DynamicDialogRef,
  ChangePasswordComponent,
  OTPService,
} from '../index';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  providers: [SignUpInDataService, SignUpInModelService, OTPService, ModalService]
})
export class ForgotpasswordComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("forgotPasswordForm", { static: true, read: NgForm }) ngForm: NgForm;
  forgotPasswordForm: UntypedFormGroup;
  public validationMsgObj: any;
  isValidate: boolean = false;
  ref: DynamicDialogRef;
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: SignUpInModelService,
    private dataSvc: SignUpInDataService,
    private configSvc: ConfigService,
    private adminSvc: AdminService,
    private optSvc: OTPService,
    public modalService: ModalService
  ) {
    super(providerSvc);
    this.validationMsgObj = forgotPasswordValidation();
  }

  ngOnInit(): void {
    try {
      this.modalService.setClass('leftmodal');
      this.modalService.setHeader('');
      this.setDefaultData();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  ngAfterViewInit(): void {
    try {
      this.forgotPasswordForm = this.ngForm.form;
      this.focus(this.forgotPasswordForm, "mobileNo");
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  setDefaultData() {
    try {
      this.modelSvc.setDefaultDataForgotPassword();
      if (this.modalService.modalData?.mobileNo) {
        this.modelSvc.forgotPasswordModel.mobileNo = this.modalService.modalData?.mobileNo;
      }
      this.getChallengeKeyConfig();
      this.getForgotPasswordConfig();
      this.getOTPConfig();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onSubmit(formGroup: NgForm) {
    try {
      this.modelSvc.isSubmitted = true;
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        this.modelSvc.isSubmitted = false;
        return;
      }

      let resObj = this.modelSvc.checkForgotPasswordOnSubmit();
      if(resObj.messageCode)
      { 
        this.showMsg(resObj.messageCode);
        this.modelSvc.isSubmitted = false;
      }
      else{
        if(resObj.optionCode == 2)
        {
          this.checkRegisteredMobileAndEmail(this.modelSvc.forgotPasswordModel.mobileNo, this.modelSvc.forgotPasswordModel.email);
        }
        else if(resObj.optionCode == 3)
        {
          this.checkRegisteredMobile(this.modelSvc.forgotPasswordModel.mobileNo);
        }
        else if(resObj.optionCode == 4)
        {
          this.checkRegisteredEmail(this.modelSvc.forgotPasswordModel.email);
        }
      }
    } catch (ex) {
      this.showErrorMsg(ex);
    }
  }

  getChallengeKeyConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.ChallengeKey).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareChallengeKeyConfig(res);
          this.modelSvc.challengeKeyModel.generatedChallangeKey = this.modelSvc.generateChallangeKey(this.modelSvc.challengeKeyModel);
          this.modelSvc.setChallengeKey();
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  checkRegisteredMobile(mobileNo: string) {
    try {
      this.modelSvc.isSubmitted = true;
      this.dataSvc.getCustomerByMobileOrEmail(mobileNo, null, true).subscribe({
        next: (res: any) => {
          if (res.body) {
            this.configSvc.setLocalStorage('customerID', res.body.id);
            this.sendOTP(mobileNo, null);
          }
          else {
            this.showMsg('2063');
            this.modelSvc.isSubmitted = false;
          }
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  checkRegisteredEmail(email: string) {
    try {
      this.modelSvc.isSubmitted = true;
      this.dataSvc.getCustomerByMobileOrEmail(null, email, false).subscribe({
        next: (res: any) => {
          if (res.body) {
            this.configSvc.setLocalStorage('customerID', res.body.id);
            this.sendOTP(null, email);
          }
          else {
            this.showMsg('2064');
            this.modelSvc.isSubmitted = false;
          }
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  checkRegisteredMobileAndEmail(mobileNo: string, email: string) {
    try {
      this.modelSvc.isSubmitted = true;
      forkJoin([
        this.dataSvc.getCustomerByMobileOrEmail(mobileNo, null, true),
        this.dataSvc.getCustomerByMobileOrEmail(null, email, false)
      ]).subscribe({
        next: (results: any) => {
          // if mobile no registered.
          if (results[0].body) {
            this.modelSvc.forgotPasswordModel.customerID = results[0].body;
          }
          else {
            if (this.modelSvc.forgotPasswordModel.mobileNo) {
              this.showMsg('2063');
            }
            mobileNo = null;
          }

          // if email registered.
          if (results[1].body) {
            this.modelSvc.forgotPasswordModel.customerID = results[1].body;
          }
          else {
            if (this.modelSvc.forgotPasswordModel.email) {
              this.showMsg('2064');
            }
            email = null;
          }

          if (this.modelSvc.forgotPasswordModel.customerID > 0) {
            this.configSvc.setLocalStorage('customerID', this.modelSvc.forgotPasswordModel.customerID);
            this.sendOTP(mobileNo, email);
          }
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
        }
      });
    } catch (e) {
      this.showMsg(e);
    }
  }

  sendOTP(mobileNo: string, email: string) {
    try {
      this.modelSvc.isSubmitted = true;
      this.optSvc.sendOTP(mobileNo, email).subscribe({
        next: (res: any) => {
          if (res.body) {
            this.showConfirmOtpModal(res.body, mobileNo, email);
          }
          else {
            this.showMsg('2059');
            this.modelSvc.isSubmitted = false;
          }
        },
        error: (err: any) => {
          this.showErrorMsg(err);
          this.modelSvc.isSubmitted = false;
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showConfirmOtpModal(userOTPID: number, mobileNo: string, email: string) {
    try {
      this.modelSvc.prepareOTPModel(userOTPID, mobileNo, email, 'forgotpassword');
      const modalConfig = new ModalConfig();
      modalConfig.position = FixedIDs.modalPosition.left;
      modalConfig.height = '100%';
      modalConfig.data = {
        otpModel: this.modelSvc.confirmOTPModel
      }

      this.ref = this.dialogSvc.open(ConfirmOtpComponent, modalConfig);
      this.ref.onClose.subscribe((obj: any) => {
        if (obj) {
          if (obj.isOTPConfirmed) {
            this.showChangePassword();
          }
          else {
            this.forgotPasswordForm.reset();
            this.modelSvc.isSubmitted = false;
          }
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showChangePassword() {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.position = FixedIDs.modalPosition.left;
      modalConfig.height = '100%';
      this.ref = this.dialogSvc.open(ChangePasswordComponent, modalConfig);
      this.closeModal();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }


  navigateToConfirmOTP(userOTPID: number, mobileNo: string, email: string) {
    try {
      this.modelSvc.prepareOTPModel(userOTPID, mobileNo, email, 'forgotpassword');
      this.router.navigateByUrl("confirmOTP");
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getForgotPasswordConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.ForgotPasswordSMSCodeSendOption).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareForgotPasswordConfig(res);
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getOTPConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.OTPConfiguration).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareOTPConfig(res);
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onEnterFunction(event, formGroup: NgForm) {
    if (event.keyCode === 13) {
      if (formGroup.dirty) this.onSubmit(formGroup);
    }
  }
  onPastePreventDefault(event: ClipboardEvent) {
    event.preventDefault();
  }

  closeModal() {
    if (this.modalService.isModal) {
      this.modalService.close();
    }
  }


}

