import { Component, Input, OnInit } from '@angular/core';
import {
    BaseComponent,
    ECommDataService,
    ECommModelService,
    GlobalConstants,
    GlobalMethods,
    OrdersComponent,
    ProviderService
} from '../index';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  providers: [ECommDataService, ECommModelService]
})
export class OrderListComponent extends BaseComponent implements OnInit {
  @Input() parentCom: OrdersComponent;
  uniqueOrderNo:string = null;
  selectedOrderId:number = null;
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    private dataSvc: ECommDataService,
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      if(GlobalConstants.customerInfo.id > 0) this.getOrderList(GlobalConstants.customerInfo.id);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getOrderList(customerID: number) {
    try {
      this.dataSvc.getOrderList(customerID).subscribe({
        next: (res: any) => {
          this.modelSvc.tempOrderList = res;
          this.modelSvc.orderList = res;
          if(this.parentCom && this.modelSvc.orderList.length > 0)
          {
            this.selectedOrderId = this.modelSvc.orderList[0].id;
            this.parentCom.onClickOrder(this.selectedOrderId);
          }
        },
        error: (e: any) => { this.showErrorMsg(e); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onClickTracking(orderID:number){
    try {
      this.modelSvc.setLocalStorage('orderTrackID', orderID);
      this.router.navigateByUrl("/order-track");
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  search(){
    try {
      if(this.uniqueOrderNo)
      {
        let searchValue = this.uniqueOrderNo.trim().toLowerCase();

        let filterData = this.modelSvc.tempOrderList.filter(f => f.uniqueOrderNo.toLowerCase().includes(searchValue));
        this.modelSvc.orderList = GlobalMethods.jsonDeepCopy(filterData);
      }
      else{
        this.modelSvc.orderList = GlobalMethods.jsonDeepCopy(this.modelSvc.tempOrderList);
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
}
