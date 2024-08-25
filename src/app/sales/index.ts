/// * Services */
export { DataService } from '../shared/services/data.service';
export { ModalService } from '../shared/services/modal.service';
export { ApiService } from '../shared/services/api.service';
export { DynamicReportService } from './../shared/services/dynamic-report.service';

// export { ErrorLogService } from '../shared/services/error-log.service';
export { AuthenticationService } from '../login/services/authentication.service';
export { AppMsgService } from '../shared/services/app-msg.service';
export { ProviderService } from '../core/services/provider.service';

export { CustomerProfileDataService, CustomerProfileModelService } from './services/customer-profile/customer-profile.service';

/// * Components */
export { NiMultipleFileViewComponent } from "../shared/components/ni-multiple-file-view/ni-multiple-file-view.component";
export { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
export { BaseComponent } from '../shared/components/base/base.component';

export { CustomerProfileComponent } from './customer-profile/customer-profile.component';

/// * Directive */
export { ValidatorDirective } from '../shared/directives/validator.directive';


export {
  QueryData,
  FileOptions,
  ExportOptionInterface,
  ExportOption,
  FileUploadOption,
  ModalConfig
} from '../shared/models/common.model';

export { Config } from '../app-shared/models/config';
export { ValidatingObjectFormat } from 'src/app/app-shared/models/javascriptVariables';
export { DynamicDialogRef } from 'primeng/dynamicdialog';
export { GlobalMethods } from 'src/app/core/models/javascriptMethods';


