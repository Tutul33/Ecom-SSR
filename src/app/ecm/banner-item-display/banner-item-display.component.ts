import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { posOrderValidation } from '../models/order/order.model';
import {
  BaseComponent,
  ECommModelService,
  ItemService,
  ProviderService,
  ValidatorDirective,
} from '../index';
import { NgForm, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-banner-item-display',
  templateUrl: './banner-item-display.component.html',
  providers: [ECommModelService, ItemService]
})
export class BannerItemDisplayComponent extends BaseComponent implements OnInit {
  category:string = null;
  bannerItems:any = [];
  @ViewChild(ValidatorDirective) directive;
  constructor(
    protected providerSvc: ProviderService,
    private dataSvc: ItemService,
    public modelSvc: ECommModelService,
    private actRoute: ActivatedRoute

  ) {
    super(providerSvc);
    this.modelSvc.validationMsgObj = posOrderValidation();
  }
  ngOnInit(): void {
    try {
      this.modelSvc.prepareDefaultData();
      this.actRoute.params.subscribe(params =>
        this.getBannerItem(params['slug'])
      )

      if(this.modelSvc.mealImageList.length == 0)
      {
        this.modelSvc.mealImageList = this.modelSvc.getLocalStorage("mealImageList") || [];
      }
      else{
        this.modelSvc.setLocalStorage("mealImageList", this.modelSvc.mealImageList);
      }
      if(this.modelSvc.itemImageList.length == 0)
      {
        this.modelSvc.itemImageList = this.modelSvc.getLocalStorage("itemImageList") || [];
      }
      else{
        this.modelSvc.setLocalStorage("itemImageList", this.modelSvc.itemImageList);
      }

      if(this.modelSvc.offerDetailList.length == 0)
      {
        this.modelSvc.offerDetailList = this.modelSvc.getLocalStorage("offerDetailList") || [];
      }
      else{
        this.modelSvc.setLocalStorage("offerDetailList", this.modelSvc.offerDetailList);
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getBannerItem(slug:string) {
    try {
      if(slug)
      {
        this.dataSvc.getBannerItem(slug).subscribe({
          next: (res: any) => {
            let data = res[res.length - 1] || [];
            if(data.length > 0)
            {
              this.category = data[0].category;
              this.bannerItems = this.modelSvc.prepareItemList(null, null, data);
            }
          },
          error: (e: any) => { this.showErrorMsg(e); }
        });
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  addToCart(item:any, formGroup: NgForm, formID:any){
    try {
      let itemForm = formGroup.form.controls['item' + formID] as UntypedFormGroup;
      if (!itemForm.valid) {
        this.directive.validateAllFormFields(itemForm);
        return;
      }
      this.modelSvc.addToCart(item);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

}
