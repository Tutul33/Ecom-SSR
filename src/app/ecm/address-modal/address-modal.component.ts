import { Component, OnInit } from '@angular/core';
import {
  AddressComponent,
  BaseComponent,
  CustomerProfileDataService,
  CustomerProfileModelService,
  ECommDataService,
  ECommModelService,
  FixedIDs,
  GlobalConstants,
  GlobalMethods,
  ModalConfig,
  ModalService,
  ProviderService,
} from '../index';
import { CustomerAddress } from '../models/customer-profile/customer-profile.model';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  providers: [ECommDataService, ECommModelService, ModalService, CustomerProfileDataService, CustomerProfileModelService]
})
export class AddressModalComponent extends BaseComponent implements OnInit {
  selectedAddress:any = null;
  constructor(
    protected providerSvc: ProviderService,
    public modalService: ModalService,
    public dataSvc: ECommDataService,
    public modelSvc: ECommModelService,
    private customerDataSvc: CustomerProfileDataService,
    public customerModelSvc: CustomerProfileModelService,

  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      if(this.modalService.modalData?.selectedAddress)
      {
        this.selectedAddress = GlobalMethods.jsonDeepCopy(this.modalService.modalData?.selectedAddress);
      }
      else{
        this.modelSvc.selectedAddress = null;
      }

      this.modalService.setHeader('');
      this.modalService.setWidth('');
      this.modalService.setClass('ecom-modal address-modal');
  
      if (this.modelSvc.orderTypeCd == FixedIDs.orderType.Delivery) {
        this.getCustomerAddress(GlobalConstants.customerInfo.id);
      }
      this.getStoreAddress();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onClickAddressOk() {
    try {
      this.modalService.close(this.selectedAddress);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }


  saveCustomerAddress(customerAddress: CustomerAddress) {
    try {
      let messageCode = customerAddress.id ? this.messageCode.editCode : this.messageCode.saveCode;
      this.customerDataSvc.saveCustomerAddress(customerAddress).subscribe({
        next: (res: any) => {
          if (res.body) {
            this.showMsg(messageCode);
            this.utilitySvc.updateCollection(this.customerModelSvc.customerAddressList, res.body);
          }
        },
        error: (err: any) => {
          this.showErrorMsg(err);
        },
        complete: () => {
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  deleteAddress(customerAddress: any) {
    this.utilitySvc
      .showConfirmModal(this.messageCode.confirmDelete)
      .subscribe((isConfirm: boolean) => {
        if (isConfirm) {
          this.customerDataSvc.deleteCustomerAddress(customerAddress.id).subscribe({
            next: (res: any) => {
              this.utilitySvc.deleteCollection(this.customerModelSvc.customerAddressList, customerAddress);
              this.showMsg(this.messageCode.deleteCode);

              if(this.modelSvc.selectedAddress != null)
              {
                if (this.modelSvc.selectedAddress.id = customerAddress.id) {
                  this.modelSvc.selectedAddress = null;
                }
              }
            },
            error: (res: any) => {
              this.showErrorMsg(res);
            },
          });
        }
      });
  }

  getStoreAddress() {
    try {
      this.dataSvc.getStores().subscribe({
        next: (res: any) => {
          if (res) {
            this.modelSvc.storeAddress = res;

            if(this.modelSvc.selectedAddress != null)
            {
              this.modelSvc.storeAddress.forEach(element => {
                if(element.storeID == this.modelSvc.selectedAddress.storeID)
                {
                  element.isSelected = true;
                }
              });
            }
          }
        },
        error: (err: any) => {
          this.showErrorMsg(err);
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getCustomerAddress(customerID: number) {
    try {
      this.customerDataSvc.getCustomerAddressByCustomerID(customerID).subscribe({
        next: (res: any) => {
          if (res) {
            this.customerModelSvc.customerAddressList = res;

            if(this.modelSvc.selectedAddress != null)
            {
              this.customerModelSvc.customerAddressList.forEach(element => {
                if(element.id == this.modelSvc.selectedAddress.id)
                {
                  element.isSelected = true;
                }
              });
             }
          }
        },
        error: (err: any) => {
          this.showErrorMsg(err);
        },
        complete: () => {
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showAddressPickerModal() {
    try {
      const modalConfig = new ModalConfig();

      this.modelSvc.ref = this.dialogSvc.open(AddressComponent, modalConfig);
      this.modelSvc.ref.onClose.subscribe((obj: any) => {
        if (obj) {
          this.customerModelSvc.prepareCustomerAddress(obj);
          this.saveCustomerAddress(this.customerModelSvc.customerAddress);
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onClickAddress(address: any) {
    try {
      this.selectedAddress = GlobalMethods.jsonDeepCopy(address);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }


}

