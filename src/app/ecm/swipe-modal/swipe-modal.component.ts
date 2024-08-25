import { Component, OnInit } from '@angular/core';
import {
  ProviderService,
  BaseComponent,
  ModalConfig,
  DynamicDialogRef,
  SwipeModalSpicyComponent,
  SwipeModalUpdateComponent,
  SwipeModalChangeComponent,
  Config, FileUploadOption, GlobalMethods, ModalService, ECommModelService 
} from '../index';
import { OrderItemComboDetail } from '../models/order/order.model';

@Component({
  selector: 'app-swipe-modal',
  templateUrl: './swipe-modal.component.html',
  providers: [ModalService,ECommModelService],
  styles: [
  ]
})


export class SwipeModalComponent extends BaseComponent implements OnInit {

  ref: DynamicDialogRef;
  orderItemComboDetailList:any = [];
  entity:any = {};
  itemViewOption: FileUploadOption;
  constructor(
    protected providerSvc: ProviderService,
    public modalService: ModalService,
    public modelSvc: ECommModelService
  )
 {
  super(providerSvc);
 }
  ngOnInit(): void {
    try {
      this.modalService.setHeader('Meal Items');
      this.modalService.setClass('ecom-modal swipe-modal');
      this.modalService.setWidth('600px');
      this.entity = GlobalMethods.jsonDeepCopy(this.modalService.modalData?.entity);
      this.orderItemComboDetailList = this.entity.orderItemComboDetailList;
      this.itemViewOption = new FileUploadOption();
      this.itemViewOption.folderName = Config.imageFolders.item;
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showSpicySwipeModal(item:any) {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.data = {
        spiceCd : GlobalMethods.jsonDeepCopy(item.spiceCd)
      }
      this.ref = this.dialogSvc.open(SwipeModalSpicyComponent, modalConfig);
      this.ref.onClose.subscribe((data: any) => {
        if(data)
        {
          item.spiceCd = data.value.code;
          item.spiceOption = data.value.value;
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showUpdateSwipeModal(item:any) {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.data = item.itemDetailCodeItemID;
          this.ref = this.dialogSvc.open(SwipeModalUpdateComponent, modalConfig);
          this.ref.onClose.subscribe((data: any) => { 
            if(data)
            {
              this.modelSvc.updateMealItem(item, data, true);
              this.modelSvc.prepareMealTotalPrice(this.entity);
            }
          });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showChangeSwipeModal(item: any) {
    try { 
      const modalConfig = new ModalConfig();
        modalConfig.data =
        {
          mealItemDetailID : item.mealItemDetailID > 0 ? item.mealItemDetailID : item.replacedMealItemDetailID
        };
        this.ref = this.dialogSvc.open(SwipeModalChangeComponent, modalConfig);
        this.ref.onClose.subscribe((data: any) => { 
          if(data)
          {
            this.modelSvc.updateMealItem(item, data, false);
            this.modelSvc.prepareMealTotalPrice(this.entity);
          }
        });

    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  delete(item:OrderItemComboDetail) {
    try{
      item.isRemoved = true;
      if(item.isPriceDeducted)
      {
        this.modelSvc.updatePriceOfComboItem(item);
        this.modelSvc.prepareMealTotalPrice(this.entity);
      }
    }catch(e){
      this.showErrorMsg(e)
    }
  }
  reset(){
    try {
      this.entity = GlobalMethods.jsonDeepCopy(this.modalService.modalData?.entity);
      this.orderItemComboDetailList = this.entity.orderItemComboDetailList;
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  confirm(){
    try {
      this.modalService.close(this.entity);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

}
