import { FieldTitleService } from './field-title.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ValidationService } from '../../shared/services/validation.service';
import { DefaultService } from '../../shared/services/default.service';
import { GlobalConstants } from '../../app-shared/models/javascriptVariables';
import * as signalR from '@microsoft/signalr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private validationSvc: ValidationService,
    private defaultSvc: DefaultService,
    private fieldTitleService: FieldTitleService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getFieldDetail(languageCode:string) {
    if(isPlatformBrowser(this.platformId)){
    return this.fieldTitleService.getFieldDetail(languageCode);
    //return this.fieldTitleService.getFieldDetail();
    }
  }

  loadErrorMessageList() {
    if(isPlatformBrowser(this.platformId)){
    return this.defaultSvc.getMessageList();
    }
  }

  loadValidationMessage() {
    if(isPlatformBrowser(this.platformId)){
    return this.validationSvc.getValidationMessageList();
    }
  }
  
  setServerDateTime() {
    if(isPlatformBrowser(this.platformId)){
    return this.defaultSvc.setServerDateTime();
    }
  }

  setLocalStorage(key: string, val: any) {
    if(isPlatformBrowser(this.platformId)){
    key = key + window.location.host;
    localStorage.setItem(key, JSON.stringify(val));
    }
  }

  getLocalStorage(key: string) {
    if(isPlatformBrowser(this.platformId)){
    key = key + window.location.host;
    return JSON.parse(localStorage.getItem(key));
    }
  }
  clearAllLocalStorage() {
    if(isPlatformBrowser(this.platformId)){
    localStorage.clear();
    }
  }
  buildSignalRConnection() {
    if(isPlatformBrowser(this.platformId)){
    GlobalConstants.signalRConnection = new signalR.HubConnectionBuilder()      
    .withUrl(GlobalConstants.ERP_MODULES_URL.signalrurl + '/notify')  
    .build();  

    GlobalConstants.signalRConnection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  }
  }
}
