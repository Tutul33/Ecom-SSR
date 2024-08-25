import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ProviderService,
  BaseComponent,
  ModalService,
  GridOption,
  ValidatorDirective,
  ECommModelService,
  GlobalMethods
} from '../index';
import { AbstractControl, NgForm, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CouponModel, couponValidation } from '../models/order/order.model';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  providers: [ModalService, ECommModelService]
})

export class CouponComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("couponForm", { static: true, read: NgForm }) couponForm: NgForm;
  gridOption: GridOption;
  couponList:CouponModel[] = [];
  public validationMsgObj: any;
  couponCode:string = null;
  constructor(
    protected providerSvc: ProviderService,
    public modalService: ModalService,
    public modelSvc: ECommModelService,
  )
 {
  super(providerSvc);
  this.validationMsgObj = couponValidation();
 }
 
  ngOnInit(): void {
    try {
      this.modalService.setHeader('Apply Coupon');
      this.modalService.setWidth('480px');
      this.modalService.setClass('ecom-modal');
      this.modalService.setHeader(this.fieldTitle['couponapplied']);
      this.initGridOption();
      this.couponList = GlobalMethods.jsonDeepCopy(this.modelSvc.orderDTO.couponList);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  ngAfterViewInit(): void {
    try {
      setTimeout(() => {
        const ctrl = this.couponForm.form.controls["couponCode"];
        let validatorList = [];
        validatorList.push(Validators.required);
        validatorList.push(this.validCouponValidator());
        ctrl.setValidators(validatorList);
        ctrl.updateValueAndValidity();
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }


  initGridOption() {
    try {
      const gridObj = {
        title: "",
        dataSource: "couponList",
        isDynamicHeader:false,
        paginator:false
      } as GridOption;
      this.gridOption = new GridOption(this, gridObj);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  ok(){
    try {
      this.modelSvc.orderDTO.couponList = GlobalMethods.jsonDeepCopy(this.couponList);
      this.modalService.close();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  add(formGroup: NgForm){
    try {
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        return;
      }
      let coupon = new CouponModel();
      coupon.couponCode = this.couponCode.trim();
      coupon.offerID = this.modelSvc.prepareOfferIDByCouponCd(coupon.couponCode);
      let duplicateObj = this.utilitySvc.checkDuplicateEntry(this.couponList, coupon, 'couponCode');
      if(duplicateObj)
      {
        this.showMsg(this.messageCode.duplicateEntry);
      }
      else{
        this.couponList.entityPush(coupon);
        this.couponCode = null;
        this.couponForm.form.markAsPristine();
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  delete(item:any){
    try {
      this.utilitySvc.deleteCollection(this.couponList, item, 'couponCode');
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  validCouponValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      if(value != null && value != '')
      {
        value = value.trim();
        if(!this.modelSvc.checkValidCuponNo(value))
        {
          return { couponCode: { message: "Coupon is not valid."} }
        }
      }
      return null;
    };
  }

}
