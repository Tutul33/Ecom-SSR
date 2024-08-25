import {  Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  BaseComponent,
  FixedIDs,
  ModalService,
  ProviderService,
  ValidatorDirective,
} from '../index';

@Component({
  selector: 'app-swipe-modal-spicy',
  templateUrl: './swipe-modal-spicy.component.html',
  providers: [ModalService]
})

export class SwipeModalSpicyComponent extends BaseComponent implements OnInit {


  ref: DynamicDialogRef;
  isModal: boolean = false;
  spicyOptionList: any = [];
  selectedList:any = [];
  selectedCode: any = {};

  @ViewChild(ValidatorDirective) directive;

  constructor(
    protected providerSvc: ProviderService,
    public dialogService: DialogService,
    public modalService: ModalService,
  )
 {
  super(providerSvc);
 }

  ngOnInit(): void { 
    this.isModal = this.modalService.isModal;
    this.spicyOptionList = FixedIDs.getList(FixedIDs.spicyOption).reverse();
    this.modalService.setHeader('Spicy Options');
    this.modalService.setClass('ecom-modal swipe-spicy');
    this.modalService.setWidth('600px');
    if(this.modalService.modalData?.spiceCd > 0)
    {
      this.selectedCode = this.spicyOptionList.find(f => f.value.code == this.modalService.modalData.spiceCd);
    }
  }
  onClickRadio(item){
    this.selectedCode = item;
  }

  onConfirm()
  { 
    try { 
      this.modalService.close(this.selectedCode);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
}
