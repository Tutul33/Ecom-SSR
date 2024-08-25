import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {
  ProviderService,
  BaseComponent,
  ModalService,
  GlobalMethods,
  ValidatorDirective,
  ECommModelService,
} from '../index';
import { RedeemPointModel, redeemPointValidation } from '../models/order/order.model';

@Component({
  selector: 'app-redeem-points',
  templateUrl: './redeem-points.component.html',
  providers: [ECommModelService, ModalService]
})
export class RedeemPointsComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("redeemPointForm", { static: true, read: NgForm }) ngForm: NgForm;
  redeemPointForm:UntypedFormGroup;
  minimumRedeemValue:number = 0;
  monetoryValue:number = 0;
  validationMsgObj: any;
  redeemPointModel:RedeemPointModel = new RedeemPointModel();
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    public modalService: ModalService,
  ) {
    super(providerSvc);
    this.validationMsgObj = redeemPointValidation();
  }

  ngOnInit(): void {
    try {
      this.modalService.setHeader(this.fieldTitle['redeempoints']);
      this.modalService.setWidth('480px');
      this.modalService.setClass('ecom-modal');
      this.redeemPointModel = this.modalService.modalData;
      this.prepareMonetoryValue();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  ngAfterViewInit(): void {
    try {
      this.redeemPointForm = this.ngForm.form;
      this.setValidation();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onChangeRedeemPoint(){
    try {
      this.redeemPointModel.pointAmount = GlobalMethods.getFixedValue( Number(this.modelSvc.toRedeemPoints) * (Number(this.redeemPointModel.usedPoint) || 0));
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onChangeRedeemValue(){
    try {
      this.redeemPointModel.usedPoint = (Number(this.redeemPointModel.pointAmount) || 0) / Number(this.modelSvc.toRedeemPoints);
      this.redeemPointModel.usedPoint = Math.round(this.redeemPointModel.usedPoint);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  redeemPoints(formGroup: NgForm)
  {
    try {
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        return;
      }

      if(this.redeemPointModel.pointAmount > this.redeemPointModel.totalAmount)
      {
        this.showMsg('2182');
        return;
      }

      this.modalService.close(this.redeemPointModel);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  
  prepareMonetoryValue(){
    try {
      this.monetoryValue = Number(this.redeemPointModel.availablePoint * this.modelSvc.toRedeemPoints);
      this.minimumRedeemValue = Number(this.modelSvc.minimumPointsToRedeem * this.modelSvc.toRedeemPoints);
    } catch (e) {
      throw e;
    }
  }

  setValidation(){
    try {
      setTimeout(() => {
        const usedPointCtrl = this.redeemPointForm.controls["usedPoint"];
         let usedPointValidatorList = [];
         usedPointValidatorList.push(Validators.required);
         usedPointValidatorList.push(this.redeemPointsValidator());
         usedPointCtrl.setValidators(usedPointValidatorList);
         usedPointCtrl.updateValueAndValidity();

         const pointAmountCtrl = this.redeemPointForm.controls["pointAmount"];
         let pointAmountValidatorList = [];
         pointAmountValidatorList.push(Validators.required);
         pointAmountValidatorList.push(this.pointAmountValidator());
         pointAmountCtrl.setValidators(pointAmountValidatorList);
         pointAmountCtrl.updateValueAndValidity();

      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  cancel(){
    try {
      this.modalService.close();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  redeemPointsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      if (value) {
        value = Number(control.value) || 0;

        if(Number(this.modelSvc.minimumPointsToRedeem) > value)
        {
          return { usedPoint: { message: "Must maintain minimum redeem point." } };
        }
        else if (value > Number(this.redeemPointModel.availablePoint) && Number(this.modelSvc.minimumPointsToRedeem) > Number(this.redeemPointModel.availablePoint)) {
          return { usedPoint: { message: "Available point must be greater or equal to minimum redeem point." } };
        }
        if (value > Number(this.redeemPointModel.availablePoint)) {
          return { usedPoint: { message: "Value should be less or equal to " + this.redeemPointModel.availablePoint } };
        }
      }
      return null;
    };
  }

  pointAmountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      if (value) {
        value = Number(control.value) || 0;

        if (value > Number(this.redeemPointModel.totalAmount)) {
          return { usedPoint: { message: "Value should be less or equal to " + GlobalMethods.getFixedValue(this.redeemPointModel.totalAmount) } };
        }
      }
      return null;
    };
  }





}
