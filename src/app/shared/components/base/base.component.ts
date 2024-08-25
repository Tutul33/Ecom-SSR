import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Config } from '../../index';
import { FixedIDs } from '../../../app-shared/models/fixedIDs';
import { GlobalMethods } from '../../../core/models/javascriptMethods';
import { GlobalConstants } from '../../../app-shared/models/javascriptVariables';
import { ProviderService } from '../../../core/services/provider.service';
import { AppMsgService } from '../../services/app-msg.service';
import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-base',
  template: '',
})
export class BaseComponent {

  shortft: any;
  longft: any;
  fieldTitle: any;
  longfht: any;
  glCons: any;
  glMethid: any;
  inputTypes: any;
  userInfo: any;
  customerInfo: any;
  keyValuePair: any;
  createDateRange: any;
  messageCode: any;
  dateFormat: string;
  timeFormat: string;
  serverDate: any;
  url: any;
  appMsgSvc: AppMsgService;
  dataTransferSvc: DataService;
  utilitySvc: UtilityService;
  dialogSvc: DialogService;
  router: Router;
  yearRange: string = '1970:2050';

  private unsubscriber: Subject<void> = new Subject<void>();

  

  constructor(protected providerSvc: ProviderService) {
    this.shortft = GlobalConstants.shortft;
    this.longft = GlobalConstants.longft;
    this.fieldTitle = GlobalConstants.fieldTitle;
    this.glCons = GlobalConstants;
    this.glMethid = GlobalMethods;
    this.userInfo = GlobalConstants.userInfo;
    this.customerInfo = GlobalConstants.customerInfo;
    this.keyValuePair = GlobalMethods.createKeyValuePair;
    this.createDateRange = GlobalMethods.createDateRange;
    this.messageCode = Config.messageCode;
    this.dateFormat = FixedIDs.fixedIDs.format.dateFormat;
    this.inputTypes = FixedIDs.fixedIDs.attributeInputTypes;
    this.timeFormat = FixedIDs.fixedIDs.format.timeFormat;
    this.serverDate = GlobalConstants.serverDate;
    this.url = Config.url;
    this.appMsgSvc = this.providerSvc.appMsgSvc;
    this.dataTransferSvc = this.providerSvc.dataTransferSvc;
    this.utilitySvc = this.providerSvc.utilitySvc;
    this.dialogSvc = this.providerSvc.dialogSvc;
    this.router = this.providerSvc.router;

    if(typeof window!='undefined'){
    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
    });
  }
  }

  ngOnInit(): void {
  }


  showErrorMsg(e) {
    this.providerSvc.appMsgSvc.showExceptionMessage(e);
  }

  showMsg(e) {
    this.providerSvc.appMsgSvc.showMessage(e);
  }

  focus(form: UntypedFormGroup, fieldName: string) {
    if(typeof window!='undefined'){
    setTimeout(() => {
      (<any>form.get(fieldName))?.nativeElement?.focus();
    });
  }
  }

  formResetByDefaultValue(form: UntypedFormGroup, value: any) {
    form.reset(value);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
