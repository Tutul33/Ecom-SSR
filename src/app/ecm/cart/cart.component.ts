
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AddressModalComponent,
    AdminService,
    BaseComponent,
    CouponComponent,
    DynamicDialogRef,
    ECommDataService,
    ECommModelService,
    FixedIDs,
    GlobalConstants,
    GlobalMethods,
    ModalConfig,
    ProviderService,
    RedeemPointsComponent,
    ValidatorDirective,
} from '../index';
import { NgForm, UntypedFormGroup } from '@angular/forms';
import { RedeemPointModel } from '../models/order/order.model';
import { EComConfig } from '../config';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    providers: [ECommDataService, ECommModelService]
})

export class CartComponent extends BaseComponent implements OnInit {
    @ViewChild(ValidatorDirective) directive;
    ref: DynamicDialogRef;
    constructor(
        protected providerSvc: ProviderService,
        public modelSvc: ECommModelService,
        private adminSvc: AdminService,
    ) {
        super(providerSvc);
    }

   ngOnInit(): void {
        try {
            if(this.modelSvc.orderDTO.orderItemList.length == 0)
            {
                this.modelSvc.prepareDefaultData();
            }
            this.getRewardPointConfig();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    onEditCustomize(item: any) {
        try {
            this.modelSvc.isEditCustomizeItem = true;
            this.modelSvc.selectedItem = GlobalMethods.jsonDeepCopy(item);
            this.modelSvc.showCustomizeModal();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    onClickPlaceOrder(formGroup: NgForm) {
        try {
            if (!formGroup.valid) {
                this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
                return;
            }
            if (GlobalConstants.customerInfo.id > 0) {
                this.router.navigateByUrl('/checkout');
            }
            else {
                this.modelSvc.showSiginModal();
            }
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    showAddressModal() {
        try {
            const modalConfig = new ModalConfig();
            this.modelSvc.ref = this.dialogSvc.open(AddressModalComponent, modalConfig);
            this.modelSvc.ref.onClose.subscribe((obj: any) => {
                if (obj) {
                    this.modelSvc.selectedAddress = obj;
                    this.modelSvc.setLocalStorage('selectedAddress', obj);
                    this.router.navigateByUrl('/checkout');
                }
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    deleteAll(){
        try {
            this.utilitySvc
            .showConfirmModal('2140')
            .subscribe((isConfirm: boolean) => {
                if (isConfirm) {
                    this.modelSvc.resetModel();
                }
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    showCoupon(){
        try {
          const modalConfig = new ModalConfig();
          this.ref = this.dialogSvc.open(CouponComponent, modalConfig);
          this.ref.onClose.subscribe((data: any) => {
            this.modelSvc.prepareOfferDiscount(this.modelSvc.orderDTO);
            this.modelSvc.calculateTotalPrice();
            this.modelSvc.setLocalStorage('orderDTO', this.modelSvc.orderDTO);
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }

      showPointRedeemModal(){
        try {
          const modalConfig = new ModalConfig();
    
          let redeemPointModel = new RedeemPointModel();
          redeemPointModel.customerName = GlobalConstants.customerInfo.name;
          redeemPointModel.memberID = GlobalConstants.customerInfo.memberID;
          redeemPointModel.availablePoint = GlobalConstants.customerInfo.availablePoint;
          redeemPointModel.usedPoint = this.modelSvc.orderDTO.invoicePaymentDetail.usedPoint;
          redeemPointModel.pointAmount = this.modelSvc.orderDTO.invoicePaymentDetail.pointAmount;
          redeemPointModel.totalAmount = this.modelSvc.orderDTO.totalAmount;

          debugger
    
        //   if(redeemPointModel.usedPoint > 0){
        //     redeemPointModel.availablePoint = this.modelSvc.orderDTO.invoicePaymentDetail.availablePoint + this.modelSvc.orderDTO.invoicePaymentDetail.usedPoint;
        //   }
    
          modalConfig.data = redeemPointModel;
    
          this.ref = this.dialogSvc.open(RedeemPointsComponent, modalConfig);
          this.ref.onClose.subscribe((data: any) => {
            if (data) {
              this.modelSvc.applyPoints(data);
            //   this.modelSvc.sendOrderInfo(this.modelSvc.orderDTO);
            }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }
    
      removeRedeemPoint(){
        try {
          let redeemPointModel = new RedeemPointModel();
          redeemPointModel.pointAmount = 0;
          redeemPointModel.usedPoint = 0;
          this.modelSvc.applyPoints(redeemPointModel);
        } catch (e) {
          this.showErrorMsg(e);
        }
      }
    
      getRewardPointConfig() {
        try {
          let moduleName = GlobalConstants.ERP_MODULES.MKT.name;
          let pageCode = EComConfig.marketingPageConfig.RewardPointSetup;
          this.adminSvc.getModuleWisePageConfig(moduleName, pageCode).subscribe({
            next: (res: any) => {
              if(res.length > 0)
                {
                  let enableRewordPointConfig =  res.find(f => f.value == FixedIDs.pageConfigType.ERP);
                  if(enableRewordPointConfig)
                  {
                    this.modelSvc.enableRewordPoint  = enableRewordPointConfig.isActive;
                  }
    
                  let enableFractionalPointCountConfig =  res.find(f => f.value == FixedIDs.pageConfigType.EFPC);
                  if(enableFractionalPointCountConfig)
                  {
                    this.modelSvc.enableFractionalPointCount  = enableFractionalPointCountConfig.isActive;
                  }
    
                  let minimumPointRedeemConfig =  res.find(f => f.value == FixedIDs.pageConfigType.MPR);
                  if(minimumPointRedeemConfig)
                  {
                    this.modelSvc.minimumPointsToRedeem  = minimumPointRedeemConfig.pageConfigValue;
                  }
    
                  let toEarnPointConfig =  res.find(f => f.value == FixedIDs.pageConfigType.TEP);
                  if(toEarnPointConfig)
                  {
                    this.modelSvc.toEarnPoints  = toEarnPointConfig.pageConfigValue;
                  }
    
                  let toRedeemPointConfig =  res.find(f => f.value == FixedIDs.pageConfigType.TRP);
                  if(toRedeemPointConfig)
                  {
                    this.modelSvc.toRedeemPoints  = toRedeemPointConfig.pageConfigValue;
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