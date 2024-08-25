
import { Component, OnInit } from '@angular/core';
import {
  BaseComponent,
  ECommDataService,
  ECommModelService,
  ProviderService,
} from '../index';

@Component({
  selector: 'app-store-address',
  templateUrl: './store-address.component.html',
  providers: [ECommModelService, ECommDataService]
})
export class StoreAddressComponent extends BaseComponent implements OnInit {
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    public dataSvc: ECommDataService,
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      if(this.modelSvc.storeAddress.length == 0)
      {
        this.getStoreAddress();
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  
  navigateToMap(entity:any)
  {
     try {
        let url = 'https://www.google.com/maps?q=' + entity.latitude + ',' + entity.longitude;
        window.open(url);
     } catch (e) {
      this.showErrorMsg(e);
     }
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

 

}
