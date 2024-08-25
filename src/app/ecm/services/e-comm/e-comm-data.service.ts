import { Injectable } from '@angular/core';
import { Config, QueryData } from '../../index';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable, map } from 'rxjs';
@Injectable()
export class ECommDataService {
  controllerName = Config.url.ecomLocalUrl + "EComm";
  spData: any = new QueryData();

  constructor(private apiSvc: ApiService) { this.spData.pageNo = 0; }

  getStores() {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetStores`, { data: JSON.stringify(this.spData) })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }

  getPaymentProcessItem() {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetPaymentProcessItem`, { data: JSON.stringify(this.spData) })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }

  save(entity: any): Observable<any> {
    try {
      let json = JSON.stringify(entity);
      console.log(json);
      return this.apiSvc.save(`${this.controllerName}/Save`, entity, true);
    } catch (e) {
      throw e;
    }
  }

  getOrderList(customerID:number) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderList`, { data: JSON.stringify(this.spData), customerID: customerID })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }
  getOrderInvoicePaymentMode(invoiceID: number) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderInvoicePaymentMode`, { invoiceID: invoiceID, data: JSON.stringify(this.spData) })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }

  getOrderDetail(orderID:number) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderDetail`, { data: JSON.stringify(this.spData), orderID: orderID })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }
  getOrderTrackingDetailByOrderID(orderID: number): Observable<any> {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderTrackingDetailByOrderID`, { orderID: orderID, data: JSON.stringify(this.spData) })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }

  getOrderIDByEncryptedOrderID(encryptedOrderID: string): Observable<any> {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderIDByEncryptedOrderID`, { encryptedOrderID: encryptedOrderID })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }
  getOrderIDByUniqueOrderNo(customerID:number, uniqueOrderNo: string): Observable<any> {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderIDByUniqueOrderNo`, {customerID: customerID, uniqueOrderNo: uniqueOrderNo})
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }
  
  getOfferDetailList(storeID?:number, memberID?:number) {
    try {
      this.spData.pageNo = 0;
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetOfferDetailList`, { data: JSON.stringify(this.spData), storeID: storeID == null ? '' : storeID, memberID: memberID == null ? '' : memberID })
        .pipe(
          map((response: any) => {
            return response.body[response.body.length - 1] || [];
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getMembershipBenefitList(memberID:number) {
    try {
      this.spData.pageNo = 0;
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetMembershipBenefitList`, { data: JSON.stringify(this.spData), memberID: memberID })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }
 

}


