import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AdminService,
  BaseComponent,
  Config,
  ECommDataService,
  ECommModelService,
  GlobalConstants,
  GlobalMethods,
  ProviderService,
} from '../index';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  providers: [ECommDataService, ECommModelService]
})
export class OrderDetailComponent extends BaseComponent implements OnInit {
  order: any = {};
  orderID: number = null;
  isTrackingPage:boolean = false;
  hasOffer:boolean = false;
  ordPaymentList:any[] = [];
  changeAmount:number = 0;
  totalPaymentAmount:number = 0;
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    private dataSvc: ECommDataService,
    private actRoute: ActivatedRoute,
    private adminSvc: AdminService,
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      if (this.actRoute.snapshot.routeConfig.path == 'order-detail') {
        this.orderID = this.modelSvc.getLocalStorage('orderID');
        if (this.orderID > 0) {
          this.getOrderDetail(this.orderID);
          this.getOrderTrackingDetailByOrderID(this.orderID);
        }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getOrderDetail(orderID: number) {
    try {
      this.modelSvc.orderItemList = [];
      this.order = {};
      this.hasOffer = false;
      this.changeAmount = 0;
      this.totalPaymentAmount = 0;
      this.dataSvc.getOrderDetail(orderID).subscribe({
        next: (res: any) => {
          this.modelSvc.orderItemList = res;
          this.order = this.modelSvc.orderItemList[0];

          if(this.order.totalCoupon > 0)
          {
            this.order.totalCouponInEnglish = GlobalMethods.inEnglish(this.order.totalCoupon);
          }

          let itemImageIDs = [...new Set(this.modelSvc.orderItemList.filter(f => f.imageID > 0).map(item => item.imageID))].join(',');
          this.getItemImage(itemImageIDs);
          this.getOrderInvoicePaymentMode(this.order.invoiceID);
          this.modelSvc.orderItemList.forEach(item => {
            if(item.mainOrderItemID > 0 || item.offerAmount > 0)
            {
              this.hasOffer = true;
              return;
            } 
          });
        },
        error: (e: any) => { this.showErrorMsg(e); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getOrderInvoicePaymentMode(invoiceID:number) {
    try {
      this.dataSvc.getOrderInvoicePaymentMode(invoiceID).subscribe({
        next: (res: any) => {
          this.ordPaymentList = res;
          if(this.ordPaymentList.length > 0)
          {
            this.ordPaymentList.forEach(item => {
              this.totalPaymentAmount += item.amount;
            });
            this.changeAmount = this.totalPaymentAmount - this.ordPaymentList[0].grandTotal;
          }
        },
        error: (e: any) => { this.showErrorMsg(e); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getItemImage(itemImageIDs:string) {
    try {
      this.adminSvc.getFileHyperLink(itemImageIDs, Config.imageFolders.item).subscribe({
        next: (res: any) => {
          if(res.length > 0)
          {
            this.modelSvc.orderItemList.forEach(element => {
              let image = res.find(f => f.id == element.imageID);
              if(image)
              {
                  element.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
              }
              else{
                  element.imageFilePath = "assets/images/no-image.png";
              }
            });
          }
        },
        error: (e: any) => { this.showErrorMsg(e); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }


  getOrderTrackingDetailByOrderID(orderID: number) {
    try {
      this.dataSvc.getOrderTrackingDetailByOrderID(orderID).subscribe({
        next: (res: any) => {
          this.modelSvc.orderTrackList = this.modelSvc.prepareTrackList(res);
        },
        error: (e: any) => { this.showErrorMsg(e); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  onClickCopyTrackingLink(trackingLink: string) {
    try {
      this.modelSvc.copyTrackingLink(trackingLink);
      this.showMsg("2095");
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
}
