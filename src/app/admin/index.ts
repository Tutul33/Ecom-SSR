/// * Services */
export { DataService } from '../shared/services/data.service';
export { ModalService } from '../shared/services/modal.service';
export { ApiService } from '../shared/services/api.service';
export { DynamicReportService } from './../shared/services/dynamic-report.service';
export { AuthenticationService } from '../login/services/authentication.service';
export { AppMsgService } from '../shared/services/app-msg.service';
export { ProviderService } from '../core/services/provider.service';
export { AdminService } from 'src/app/app-shared/services/admin.service';
export { DialogService } from 'primeng/dynamicdialog';
export { ConfigService } from 'src/app/core/services/config.service';


export { SignUpInDataService, SignUpInModelService } from './services/signUpIn.service';
export { OTPService, OTPModelService } from './services/otp.service';

/// * Components */
export { NiMultipleFileViewComponent } from "../shared/components/ni-multiple-file-view/ni-multiple-file-view.component";
export { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
export { BaseComponent } from '../shared/components/base/base.component';

/// * Directive */
export { ValidatorDirective } from '../shared/directives/validator.directive';

///
export { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
export { ChangePasswordComponent } from './change-password/change-password.component';
export { SignupComponent } from './signup/signup.component';
export { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';
export { MobileNoModalComponent } from './mobile-no-modal/mobile-no-modal.component';



export {
  QueryData,
  FileOptions,
  ExportOptionInterface,
  ExportOption,
  FileUploadOption,
  ModalConfig
} from '../shared/models/common.model';
export { OTPModel, oTPValidation } from 'src/app/shared/models/otp.model';



export { Config } from '../app-shared/models/config';
export { ValidatingObjectFormat } from 'src/app/app-shared/models/javascriptVariables';
export { DynamicDialogRef } from 'primeng/dynamicdialog';
export { GlobalMethods } from 'src/app/core/models/javascriptMethods';
export { FixedIDs, GlobalConstants } from 'src/app/shared';
export { AdminConfig } from '../admin/config';





