import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BaseComponent,
  ECommModelService,
  GlobalMethods,
  ProviderService,
  ValidatorDirective
} from '../index';
import { FixedIDs, ModalService } from 'src/app/app-shared';
import { NgForm, UntypedFormGroup } from '@angular/forms';
import { posOrderValidation } from '../models/order/order.model';
@Component({
  selector: 'app-spicy-option',
  templateUrl: './spicy-option.component.html',
  providers: [ECommModelService, ModalService]
})
export class SpicyOptionComponent extends BaseComponent implements OnInit {
  @ViewChild("spicyOptionForm", { static: true, read: NgForm }) spicyOptionForm: NgForm;
  spicyOptionList: any = [];
  selectedList: any = [];
  validationMsgObj: any;
  val: any;
  @ViewChild(ValidatorDirective) directive;
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    public modalService: ModalService

  ) {
    super(providerSvc);
    this.validationMsgObj = posOrderValidation();
  }

  ngOnInit(): void {
    try {
      this.modalService.setHeader('Spicy Option');
      this.modalService.setWidth('500px');
      this.modalService.setClass('ecom-modal spicy-modal');
      this.spicyOptionList = FixedIDs.getList(FixedIDs.spicyOption).reverse();
      this.spicyOptionList.forEach(element => {
        element.qty = 0;
      });
      this.spicyOptionList[0].qty = GlobalMethods.jsonDeepCopy(this.modelSvc.selectedItem.qty);

      if(this.modelSvc.selectedItem.qty > 0)
      {
        this.utilitySvc.updateCollection(this.selectedList, this.spicyOptionList[0], 'text');
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  ngAfterViewInit(): void {
    try {
      setTimeout(() => {
        document.getElementById("qty_0").focus();
      }, 50);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onClickMinus(entity: any) {
    try {
      let qty = parseFloat(entity.qty);
      if (qty > 0) {
        entity.qty = qty - 1;
        if (entity.qty == 0) {
          this.utilitySvc.deleteCollection(this.selectedList, entity, 'text');
        }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onClickPlus(entity: any) {
    try {
      let qty = parseFloat(entity.qty);
      entity.qty = qty + 1;
      this.utilitySvc.updateCollection(this.selectedList, entity, 'text');
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onChangeQty(entity: any) {
    try {
      let qty = parseFloat(entity.qty);
      if (qty == 0 || isNaN(qty)) {
        this.utilitySvc.deleteCollection(this.selectedList, entity, 'text');
        if (isNaN(qty)) entity.qty = 0;
      }
      else {
        this.utilitySvc.updateCollection(this.selectedList, entity, 'text');
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onConfirm(formGroup: NgForm) {
    try {
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        return;
      }
      this.modalService.close(this.selectedList.reverse());
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
}
