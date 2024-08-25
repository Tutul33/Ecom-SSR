import { Component, OnInit } from '@angular/core';
import { ModalService } from '..';
@Component({
  selector: 'app-store-address-detail',
  templateUrl: './store-address-detail.component.html',
  providers: [ModalService]
})
export class StoreAddressDetailComponent implements OnInit {
    store:any = {};
  constructor(
    public modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.modalService.setHeader('');
    this.modalService.setClass('ecom-modal stores-modal');
    this.modalService.setWidth('500px');
    this.store = this.modalService.modalData?.store;
  }
  
  navigateToMap(entity:any)
  {
    let url = 'https://www.google.com/maps?q=' + entity.latitude + ',' + entity.longitude;
    window.open(url);
  }

}

