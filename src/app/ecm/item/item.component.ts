import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ECommModelService, ValidatorDirective,
} from '../index';
import { posOrderValidation } from '../models/order/order.model';
import { NgForm, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  providers: [ECommModelService]
})
export class ItemComponent {
  @ViewChild(ValidatorDirective) directive;

  constructor(
    public modelSvc: ECommModelService
  ) {
    this.modelSvc.validationMsgObj = posOrderValidation();
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
      throw e;
    }
  }
}
