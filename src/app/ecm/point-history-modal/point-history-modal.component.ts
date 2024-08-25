import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

import {
  ProviderService,
  BaseComponent,
  ModalService,
  QueryData,
  CustomerProfileDataService,
  CustomerProfileModelService,
} from "../index";


@Component({
  selector: 'app-point-history-modal',
  templateUrl: './point-history-modal.component.html',
  providers: [ModalService, CustomerProfileDataService, CustomerProfileModelService]
})
export class PointHistoryModalComponent extends BaseComponent implements OnInit {

  spData: any = new QueryData();
  pageHeader: string;

  constructor(
    protected providerSvc: ProviderService,
    public modalService: ModalService,
    public dialogService: DialogService,
    private customerDataSvc: CustomerProfileDataService,
    public customerModelSvc: CustomerProfileModelService,
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    this.modalService.setWidth('850px');
    this.modalService.setClass('ecom-modal history-modal');
    this.getMemberPointHistoryList(this.modalService.modalData.customerID);
  }

  getMemberPointHistoryList(customerID: number) {
    try {
      this.spData = new QueryData({
        pageNo: 0
      });
      this.customerDataSvc.getMemberPointHistoryList(this.spData, customerID).subscribe({
        next: (res: any) => {
          this.customerModelSvc.memberPointHistoryList = res[res.length - 1] || [];         
        },
        error: (res: any) => {
          this.showErrorMsg(res);
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
}
