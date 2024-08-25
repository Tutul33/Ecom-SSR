import { Component, OnInit } from '@angular/core';
import {
    BaseComponent,
    ECommDataService,
    ECommModelService,
    GlobalConstants,
    ProviderService,
} from '../index';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    providers:[ECommModelService, ECommDataService]
})

export class SuccessComponent extends BaseComponent implements OnInit{
    constructor(
        protected providerSvc: ProviderService,
        public modelSvc: ECommModelService,
        private dataSvc:ECommDataService
    ) {
        super(providerSvc);
    }

    ngOnInit(): void {
        try {
            if(!this.modelSvc.tempOrderDTO.orderNo)
            {
                this.modelSvc.tempOrderDTO = this.modelSvc.getLocalStorage('tempOrderDTO');
            }
        } catch (e) {
            this.showErrorMsg(e);
        }
    }    

    onClickTrackOrder(orderID:number)
    {
        try {
            this.modelSvc.setLocalStorage('orderTrackID', orderID);
            this.router.navigateByUrl('/order-track');
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    onClickCopyTrackingLink(trackingLink:string)
    {
        try {
            this.modelSvc.copyTrackingLink(trackingLink);
            this.showMsg("2095");
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    onClickOrderDetail(orderID:number)
    {
        try {
            this.modelSvc.setLocalStorage('orderID', orderID);
            this.router.navigateByUrl('/order-detail');
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    getOfferDetailList() {
        try {
          this.dataSvc.getOfferDetailList(null, GlobalConstants.customerInfo.id).subscribe({
            next: (res: any) => {
              this.modelSvc.tempOfferDetailList = res || [];
              this.modelSvc.modifyOfferItem();
            },
            error: (err: any) => {
              this.showErrorMsg(err);
            }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }
}