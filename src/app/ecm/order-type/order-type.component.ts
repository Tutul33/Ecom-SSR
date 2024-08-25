import { Component, OnInit } from '@angular/core';
import {
  AdminService,
  BaseComponent,
  ECommModelService,
  ProviderService,
  FixedIDs,
  GlobalMethods,
  ModalService,
  GlobalConstants,
  ModalConfig,
  AddressModalComponent,
  AddressComponent,
  ECommDataService
} from '../index';
@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  providers: [ECommModelService, ECommDataService, ModalService]

})
export class OrderTypeComponent extends BaseComponent implements OnInit {
  selectedOrderType: any = null;
  orderTypeList:any = [];
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    public dataSvc: ECommDataService,
    public modalService: ModalService,
    private adminSvc: AdminService,

  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      this.modalService.setHeader('');
      this.modalService.setWidth('675px');
      this.modalService.setClass('ecom-modal type-modal');
      this.selectedOrderType = GlobalMethods.jsonDeepCopy(this.modelSvc.orderTypeCd);
      this.getOrderTypeByOrderCategoryCd();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  getOrderTypeByOrderCategoryCd() {
    try {
      this.adminSvc.getOrderTypeByOrderCategoryCd(FixedIDs.orderCategory.Ecommerce).subscribe({
        next: (res: any) => {
          this.orderTypeList = res;
        },
        error: (res: any) => { this.showErrorMsg(res) }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getStores() {
    try {
      this.dataSvc.getStores().subscribe({
        next: (res: any) => {
          if (this.modelSvc.storeAddress.length == 0) {
            this.modelSvc.storeAddress = res || [];
          }
        },
        error: (res: any) => { this.showErrorMsg(res) }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  confirm() {
    try {
      this.modelSvc.orderTypeCd = GlobalMethods.jsonDeepCopy(this.selectedOrderType);
      this.modalService.close(this.modelSvc.orderTypeCd);
    } catch (e) {
      this.showErrorMsg(e);
    }
  
  }

  onClickOrderType(orderTypeCd:string){
    try {
      this.modelSvc.orderTypeCd = GlobalMethods.jsonDeepCopy(orderTypeCd);
      if(this.modelSvc.orderTypeCd == FixedIDs.orderType.Delivery)
      {
        if(GlobalConstants.customerInfo.id > 0)
        {
          this.showAddressModal();
        }
        else{
          this.showAddressPickerModal();
        }
      }
      else{
        this.showAddressModal();
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  showAddressPickerModal() {
    try {
      this.modelSvc.setLocalStorage('addressPickerModel', null);
      const modalConfig = new ModalConfig();
      this.modelSvc.ref = this.dialogSvc.open(AddressComponent, modalConfig);
      this.modelSvc.ref.onClose.subscribe((obj: any) => {
        if (obj) {
          debugger
          obj.latitude = obj.latitude.toString();
          obj.longitude = obj.longitude.toString();
          this.modelSvc.setLocalStorage('selectedAddress', obj);
          this.modelSvc.setLocalStorage('addressPickerModel', obj);
          this.prepareAddress();
          this.modalService.close(this.modelSvc.orderTypeCd);
        }
        else if(obj === null ) {
          this.showAddressModal();
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  prepareAddress() {
    try {
      if (this.modelSvc.orderTypeCd == FixedIDs.orderType.Delivery) {
        this.modelSvc.setStoreAddress();
      } else {
        this.modelSvc.strOpeningTime = this.modelSvc.selectedAddress.openingTime;
        this.modelSvc.strClosingTime = this.modelSvc.selectedAddress.closingTime;
        this.modelSvc.prepareOrderDeliveryDetail(this.modelSvc.selectedAddress,null);
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showAddressModal() {
    try {
        const modalConfig = new ModalConfig();
        modalConfig.data = {
            selectedAddress: GlobalMethods.jsonDeepCopy(this.modelSvc.selectedAddress)
        }
        this.modelSvc.ref = this.dialogSvc.open(AddressModalComponent, modalConfig);
        this.modelSvc.ref.onClose.subscribe((obj: any) => {
            if (obj) {
                this.modelSvc.selectedAddress = obj;
                this.modelSvc.setLocalStorage('selectedAddress', obj);
                this.prepareAddress();
                this.modalService.close(this.modelSvc.orderTypeCd);
            }
        });
      } catch (e) {
          this.showErrorMsg(e);
      }
    }
}
