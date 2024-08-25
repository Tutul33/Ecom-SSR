import {
  loadFieldTitle,
  loadValidation,
  loadErrorMessage,
  setServerDate,
  setSignalRConnection,
} from './core/models/app.initializer';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

// Third party module
import { ToastrModule } from 'ngx-toastr';
/* NgRx */


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './core/services/http-interceptor.service';
import { DefaultComponent } from './default.component';


import { AppSharedModule } from './app-shared/app-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorLogService } from './shared/services/error-log.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SharedModule,
    AppSharedModule,
    AppRoutingModule 
  ],
  exports: [
    HttpClientModule
  ],

  providers: [
    loadFieldTitle,
    loadValidation,
    loadErrorMessage,
    setServerDate,
    setSignalRConnection,
    // setSocialConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler, 
      useClass: ErrorLogService
    }
  ],
  declarations: [AppComponent, DefaultComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
