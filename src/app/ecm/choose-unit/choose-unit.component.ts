import { Component, OnInit } from '@angular/core';
import { GlobalMethods, ModalService } from 'src/app/app-shared';
import {
  BaseComponent,
  ECommModelService,
  ProviderService
} from '../index';
@Component({
  selector: 'app-choose-unit',
  templateUrl: './choose-unit.component.html',
  providers: [ECommModelService, ModalService]
})
export class ChooseUnitComponent extends BaseComponent implements OnInit {
  selectedUnitID: number = null;
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    public modalService: ModalService
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      if (this.modelSvc.selectedItem.selectedUnitID) {
        this.selectedUnitID = GlobalMethods.jsonDeepCopy(this.modelSvc.selectedItem.selectedUnitID);
      }
      this.modalService.setHeader('Choose Unit');
      this.modalService.setWidth('480px');
      this.modalService.setClass('ecom-modal');
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  closeModal() {
    this.modalService.close(this.selectedUnitID);
  }

  onConfirmUnit() {
    try {
      this.modelSvc.selectedItem.selectedUnitID = GlobalMethods.jsonDeepCopy(this.selectedUnitID);
      let salesPrice = this.modelSvc.selectedItem.salesPriceList.find(f => f.uOMID == this.selectedUnitID);
      this.modelSvc.selectedItem.allowFractionalSale = GlobalMethods.jsonDeepCopy(salesPrice.allowFractionalSale);
      this.modelSvc.selectedItem.selectedUOMSN = GlobalMethods.jsonDeepCopy(salesPrice.sUOMSN);
      this.closeModal();
    } catch (e) {
      throw e;
    }
  }
}
