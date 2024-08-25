
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ECommModelService, GlobalConstants } from '..';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  providers:[ECommModelService]
})

export class OrdersComponent implements OnInit {
  @ViewChild(OrderDetailComponent) orderDetailComponent: OrderDetailComponent;
  get self(): OrdersComponent { return this };
  constructor(
    public modelSvc: ECommModelService
  ) 
  {

  }
  ngOnInit(): void {
    if (!GlobalConstants.customerInfo.id) {
      this.modelSvc.showSiginModal();
    }
  }

  onClickOrder(orderID: number) {
    this.orderDetailComponent.getOrderDetail(orderID);
    this.orderDetailComponent.getOrderTrackingDetailByOrderID(orderID);
  }
}