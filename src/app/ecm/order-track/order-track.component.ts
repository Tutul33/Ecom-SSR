import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  BaseComponent, 
  ProviderService,
  ECommDataService,
  ECommModelService,
  OrderDetailComponent, 
} from '../index';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  providers: [ECommDataService, ECommModelService]
})
export class OrderTrackComponent extends BaseComponent implements OnInit, AfterViewInit  {
  @ViewChild(OrderDetailComponent) orderDetailComponent: OrderDetailComponent;
  encryptedOrderID:any = null;
  orderID:any = null;
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    private dataSvc: ECommDataService,
    private actRoute: ActivatedRoute
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      this.actRoute.paramMap.subscribe(res => {
        this.encryptedOrderID = res.get('orderid');
      });
      this.orderID = this.modelSvc.getLocalStorage('orderTrackID');
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  ngAfterViewInit(): void {
    try {
      if(this.encryptedOrderID)
      {
        this.getOrderIDByEncryptedOrderID(this.encryptedOrderID);
      }
      else if(this.orderID > 0)
      {
        this.getOrderDetail(this.orderID);
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getOrderIDByEncryptedOrderID(encryptedOrderID: string) {
    try {
      this.dataSvc.getOrderIDByEncryptedOrderID(encryptedOrderID).subscribe({
        next: (res: any) => {
          this.getOrderDetail(res);
        },
        error: (e: any) => { this.showErrorMsg(e); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getOrderDetail(orderID:any)
  {
    try {
      this.orderDetailComponent.isTrackingPage = true;
      this.orderDetailComponent.getOrderDetail(orderID);
      this.orderDetailComponent.getOrderTrackingDetailByOrderID(orderID);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

}

