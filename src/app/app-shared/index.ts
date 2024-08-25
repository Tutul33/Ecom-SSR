///* Services *///
export { DataService } from '../shared/services/data.service';
export { ModalService } from '../shared/services/modal.service';
export { ApiService } from '../shared/services/api.service';
export { ConfigService } from '../core/services/config.service';
export { ProviderService } from '../core/services/provider.service';

export { SalesService } from './services/sales.service';
export { AdminService } from './services/admin.service';

///* Components *///
export { BaseComponent } from '../shared/components/base/base.component';

export { FooterComponent } from './components/footer/footer.component';
export { HeaderComponent } from './components/header/header.component';

///* Models *///
// Others
export { GlobalMethods } from '../core/models/javascriptMethods';
export { GlobalConstants } from '../app-shared/models/javascriptVariables';
export { FixedIDs } from '../app-shared/models/fixedIDs';

export { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

export {
    QueryData,
    FileOptions,
    ExportOptionInterface,
    ExportOption,
    FileUploadOption,
    ModalConfig
  } from '../shared/models/common.model';
export { Config } from '../app-shared/models/config';







