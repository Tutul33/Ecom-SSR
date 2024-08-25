import { NgModule } from '@angular/core';
import { SalesRoutingModule } from './sales-routing.module';
import { SharedModule } from '../shared/shared.module';

import {
  ApiService,
  CustomerProfileComponent 
} from './index';

@NgModule({
  declarations: [
    CustomerProfileComponent
  ],
  imports: [    
    SalesRoutingModule,
    SharedModule
  ],
  providers: [ApiService]
})
export class SalesModule { }


