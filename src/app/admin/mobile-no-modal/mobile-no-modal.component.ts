import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import {SignUpInModel, signUpInValidation } from '../models/sign-up-in.model';
import {
  ProviderService,
  BaseComponent,
  ValidatorDirective,
  SignUpInModelService,
  DynamicDialogRef,
  ModalService,
  GlobalConstants,
  AdminService,
} from '../index';
import { EComConfig } from 'src/app/ecm/config';

@Component({
  selector: 'app-mobile-no-modal',
  templateUrl: './mobile-no-modal.component.html',
  providers: [SignUpInModelService, ModalService]
})
export class MobileNoModalComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("signUpInForm", { static: true, read: NgForm }) ngForm: NgForm;
  signUpInForm: UntypedFormGroup;
  public validationMsgObj: any;
  ref: DynamicDialogRef;
 
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: SignUpInModelService,
    private adminSvc: AdminService,
    public modalService: ModalService,
  ) {
    super(providerSvc);
    this.validationMsgObj = signUpInValidation();
  }

  ngOnInit(): void {
    try {
      this.modalService.setHeader('');
      this.modalService.setClass('ecom-modal');
      this.modelSvc.socialLoginModel = new SignUpInModel();
      this.setDefaultData();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  setDefaultData() {
    try {
      this.modelSvc.setDefaultDataForSignUpIn();
      this.getChallengeKeyConfig();
      this.getPasswordRuleConfig();
      this.getOTPConfig();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
 

  ngAfterViewInit(): void {
    try {
      this.signUpInForm = this.ngForm.form;
      this.focus(this.signUpInForm, "mobileNo");
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getChallengeKeyConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.ChallengeKey).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareChallengeKeyConfig(res);
          this.modelSvc.setChallengeKey();
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getPasswordRuleConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.CustomerPasswordRules).subscribe({
        next: (res: any) => {
          this.modelSvc.preparePasswordRulesConfig(res);
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
  getCustomerLoginConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(GlobalConstants.ERP_MODULES.ECM.name, EComConfig.ecomPageConfig.CustomerLoginOption).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareCustomerLoginConfig(res);
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onSubmitMobileNo(formGroup: NgForm) {
    try {
      this.modelSvc.isSubmitted = true;
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        this.modelSvc.isSubmitted = false;
        return;
      }
      if (this.modelSvc.challengeKeyModel.isEnableChallengeKey) {
        if (this.modelSvc.socialLoginModel.challengeKey != this.modelSvc.challengeKeyModel.generatedChallangeKey) {
          this.modelSvc.setChallengeKey();
          this.modelSvc.isSubmitted = false;
          this.showMsg('2061');
          return;
        }
      }
      this.modalService.close(this.modelSvc.socialLoginModel.mobileNo);
    } catch (ex) {
      this.showErrorMsg(ex);
    }
  }

  setMobileNoValidation() {
    try {
      setTimeout(() => {
        const ctrl = this.signUpInForm.controls["mobileNo"];
        let validatorList = [];
        validatorList.push(Validators.required);
        validatorList.push(Validators.maxLength(14));
        validatorList.push(Validators.pattern('(^(\\+88)?(01){1}[3456789]{1}(\\d){8})$'));
        ctrl.setValidators(validatorList);
        ctrl.updateValueAndValidity();
      });
    } catch (e) {
      throw e;
    }
  }
  setPasswordValidation() {
    try {
      setTimeout(() => {
        const ctrl = this.signUpInForm.controls["password"];
        let validatorList = [];
        validatorList.push(Validators.required);
        validatorList.push(Validators.maxLength(16));
        validatorList.push(this.modelSvc.passwordValidator());
        ctrl.setValidators(validatorList);
        ctrl.updateValueAndValidity();
      });
    } catch (e) {
      throw e;
    }
  }
  setRequiredValidation(fieldName: string) {
    try {
      setTimeout(() => {
        const ctrl = this.signUpInForm.controls[fieldName];
        ctrl.setValidators(Validators.required);
        ctrl.updateValueAndValidity();
      });
    } catch (e) {
      throw e;
    }
  }

  onPastePreventDefault(event: ClipboardEvent) {
    event.preventDefault();
  }

  onMobileFormEnterFunction(event, formGroup: NgForm) {
    if (event.keyCode === 13) {
      if (formGroup.dirty) this.onSubmitMobileNo(formGroup);
    }
  }

  closeModal(mobileNo:string) {
  }

}
