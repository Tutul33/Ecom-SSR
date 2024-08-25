import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { InputNumberModule } from 'primeng/inputnumber';
import { FooterComponent, HeaderComponent } from './index';
import { loadDutyConfig, loadDutyFormulaDetail, setThirdPartyApiKey, loadEComPageConfig, loadDeliveryCharge, loadBaseCurrency } from "./models/app-shared.initializer";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    InputNumberModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  providers: [loadEComPageConfig, loadDutyConfig, loadDutyFormulaDetail, loadDeliveryCharge, setThirdPartyApiKey, loadBaseCurrency]
})
export class AppSharedModule { }
