import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AdminService,
  BaseComponent,
  ECommModelService,
  ProviderService,
  ValidatorDirective
} from '../index';
import { posOrderValidation } from '../models/order/order.model';
import { NgForm, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-special-item',
  templateUrl: './special-item.component.html',
  providers: [ECommModelService]
})
export class SpecialItemComponent extends BaseComponent implements OnInit {
  @ViewChild(ValidatorDirective) directive;
  
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    private adminSvc: AdminService
  ) {
    super(providerSvc);
    this.modelSvc.validationMsgObj = posOrderValidation();
  }

  ngOnInit(): void {
    try {
      if (!this.modelSvc.specialItemData) {
        this.modelSvc.specialItemData = this.modelSvc.getSpecialItemFromLocalStorage();
      }
      if(this.modelSvc.mealItemComDetailList.length == 0)
      {
            this.modelSvc.mealItemComDetailList = this.modelSvc.getLocalStorage('mealItemComDetailList');
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
