import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, NgForm } from '@angular/forms';
import { AdminService } from 'src/app/app-shared/services/admin.service';
import { FixedIDs } from 'src/app/app-shared/models/fixedIDs';
import { GlobalConstants } from 'src/app/app-shared/models/javascriptVariables';
import { ConfigService } from 'src/app/core/services/config.service';
import { AdminConfig } from '../config';
import {
  ProviderService,
  BaseComponent,
  ValidatorDirective,
  SignUpInDataService,
  SignUpInModelService,
  ModalService,
  ModalConfig,
  SignupComponent,
  DynamicDialogRef,
} from '../index';
import { ChangePasswordModel, changePasswordValidation, PasswordRuleModel } from '../models/sign-up-in.model';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  providers: [SignUpInDataService, SignUpInModelService, ModalService]
})
export class ChangePasswordComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("changePasswordForm", { static: true, read: NgForm }) changePasswordForm: NgForm;
  public validationMsgObj: any;
  ref: DynamicDialogRef;

  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: SignUpInModelService,
    private dataSvc: SignUpInDataService,
    private configSvc: ConfigService,
    private adminSvc: AdminService,
    public modalService: ModalService,
    public dialogService: DialogService,
  ) {
    super(providerSvc);
    this.validationMsgObj = changePasswordValidation();
  }
  ngOnInit(): void {
    try {

      this.modalService.setClass('leftmodal');
      this.modalService.setHeader('');

      this.modelSvc.changePasswordMoel = new ChangePasswordModel();

      let customerInfo = this.configSvc.getLocalStorage("customerInfo");
      if (customerInfo != null) {
        this.modelSvc.changePasswordMoel.type = 2; // for change old password
        this.modelSvc.changePasswordMoel.customerID = customerInfo.id;
        this.checkPasswordExistByCustomerID(customerInfo.id);
      }
      else {
        if (this.configSvc.getLocalStorage("customerID") != null) {
          this.modelSvc.changePasswordMoel.customerID = this.configSvc.getLocalStorage("customerID");
          this.modelSvc.changePasswordMoel.type = 1; // for create new password
          this.configSvc.setLocalStorage('customerID', null);
        }
      }
      this.setDefaultData();

    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  ngAfterViewInit(): void {
    if (this.modelSvc.changePasswordMoel.type == 2) {
      this.focus(this.changePasswordForm.form, 'currentPassword');
    }
    else {
      this.focus(this.changePasswordForm.form, 'password');
    }
  }

  setDefaultData() {
    try {
      this.modelSvc.passwordRuleModel = new PasswordRuleModel();
      this.modelSvc.pageConfigType = FixedIDs.pageConfigType;
      this.modelSvc.moduleName = GlobalConstants.ERP_MODULES.ADMIN.name;
      this.modelSvc.adminPageConfig = AdminConfig.adminPageConfig;
      this.getPasswordRuleConfig();
      this.validationMsgObj["changePasswordValidateModel"]["password"]["customValidator"] = { message: "Password Validation Failed.", method: this.modelSvc.passwordValidator() };
    } catch (e) {
      this.showErrorMsg(e);
    }
  }


  onSubmit(formGroup: NgForm) {
    try {
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        return;
      }

      if (this.modelSvc.changePasswordMoel.password != this.modelSvc.changePasswordMoel.reEnterPassword) {
        this.showMsg('2060');
        return;
      }

      this.SavePassword(this.modelSvc.changePasswordMoel);

    } catch (ex) {
      this.showErrorMsg(ex);
    }
  }

  SavePassword(changePassword: ChangePasswordModel) {
    try {
      this.modelSvc.isSubmitted = true;
      this.dataSvc.savePassword(changePassword).subscribe({
        next: (res: any) => {
          this.modelSvc.isSubmitted = false;
          if (res.body != null) {
            if (this.modelSvc.changePasswordMoel.type == 2) // for change old password
            {
              if (res.body.isCurrentPasswordMatch == false) {
                this.showMsg('2065');
              }
              else {
                this.showMsg(this.messageCode.editCode);
                this.closeModal();
              }
            }
            else {
              this.showMsg(this.messageCode.editCode);
              if (GlobalConstants.customerInfo.id > 0) {
                this.closeModal();
              }
              else {
                this.showSiginModal();
              }
            }
          }
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
        },
        complete: () => {
          this.modelSvc.isSubmitted = false;
        }
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

  checkPasswordExistByCustomerID(customerID: number) {
    try {
      this.dataSvc.checkPasswordExistByCustomerID(customerID).subscribe({
        next: (res: any) => {
          if (!res.body) {
            this.modelSvc.changePasswordMoel.type = 1; // for create new password
          }
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onEnterFunction(event, formGroup: NgForm) {
    try {
      if (event.keyCode === 13) {
        if (formGroup.dirty) this.onSubmit(formGroup);
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  closeModal() {
    if (this.modalService.isModal) {
      this.modalService.close();
    }
  }

  showSiginModal() {
    const modalConfig = new ModalConfig();
    modalConfig.position = FixedIDs.modalPosition.left;
    modalConfig.height = '100%';
    this.ref = this.dialogService.open(SignupComponent, modalConfig);
    this.closeModal();
  }

}


