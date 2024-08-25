import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AddressModalComponent,
  AdminService,
  BaseComponent,
  Config,
  CustomerProfileDataService,
  CustomerProfileModelService,
  ECommDataService,
  ECommModelService,
  FileUploadOption,
  FixedIDs,
  GlobalConstants,
  GlobalMethods,
  ModalConfig,
  ProviderService,
  StoreAddressDetailComponent,
  ValidatorDirective,
} from "../index";
import { NgForm, UntypedFormGroup } from "@angular/forms";
import { orderDeliveryDetailValidation } from "../models/order/order.model";
import { forkJoin } from "rxjs";
import { OrderSalesReportService } from "src/app/app-shared/services/order-sales-report.service";
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  providers: [
    ECommDataService,
    ECommModelService,
    CustomerProfileModelService,
    CustomerProfileDataService,
  ],
})
export class CheckoutComponent extends BaseComponent implements OnInit {
  isPlaceOrder: boolean = false;
  selectedPaymentTypeInfo: any = null;
  orderPaymentList: any = [];
  payImageViewOption: FileUploadOption;
  bankCardTypeViewOption: FileUploadOption;
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("storeAddressForm", { static: true, read: NgForm })
  storeAddressForm: NgForm;
  isVisibleStoreDetail:boolean = false;
  storeAddressInfo:any = {};
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    public dataSvc: ECommDataService,
    public customerModelSvc: CustomerProfileModelService,
    private customerDataSvc: CustomerProfileDataService,
    private adminSvc: AdminService,
    private salesReportService: OrderSalesReportService,
  ) {
    super(providerSvc);
    this.modelSvc.validationMsgObj = orderDeliveryDetailValidation();
  }

  ngOnInit(): void {
    try {
      this.modelSvc.prepareDefaultData();

      this.modelSvc.orderDTO.orderDeliveryDetail.preorderDate =
        this.modelSvc.minDate;
      if (!this.modelSvc.selectedAddress) {
        this.modelSvc.selectedAddress =
          this.modelSvc.getLocalStorage("selectedAddress");
      }
      this.getDefaultData();

      this.payImageViewOption = new FileUploadOption();
      this.payImageViewOption.folderName =
        Config.imageFolders.paymentgatewaysvc;

      this.bankCardTypeViewOption = new FileUploadOption();
      this.bankCardTypeViewOption.folderName = Config.imageFolders.bankcardtype;
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getDefaultData() {
    try {
      let serviceList = [
        this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName,this.modelSvc.salesPageConfig.DeliveryTimeSet),
        this.dataSvc.getPaymentProcessItem(),
      ];
      if (this.modelSvc.storeAddress.length == 0) {
        serviceList.push(this.dataSvc.getStores());
      }

      forkJoin(serviceList).subscribe({
        next: (results: any) => {
          this.modelSvc.deliveryTimeSetList = results[0] || [];
          if (this.modelSvc.storeAddress.length == 0) {
            this.modelSvc.storeAddress = results[2] || [];
          }
          this.prepareAddress();
          this.modelSvc.tempPaymentProcessItemList = this.modelSvc.preparePaymentProcess(results[1] || []);
          this.modelSvc.preparePaymentProcessByStoreID(this.modelSvc.orderDTO.storeID);
        },
        error: (res: any) => {
          this.showErrorMsg(res);
        },
      });
      this.getRewardPointConfig();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  prepareAddress() {
    try {
      if (this.modelSvc.orderTypeCd == FixedIDs.orderType.Delivery) {
        this.modelSvc.setStoreAddress();
        this.modelSvc.setStrScheduleTime();
      } else {
        this.modelSvc.strOpeningTime = this.modelSvc.selectedAddress.openingTime;
        this.modelSvc.strClosingTime = this.modelSvc.selectedAddress.closingTime;
        this.modelSvc.prepareOrderDeliveryDetail(this.modelSvc.selectedAddress,null);
        this.modelSvc.setStrScheduleTime();
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  saveOrder(formGroup: NgForm) {
    try {
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(
          formGroup.form as UntypedFormGroup
        );
        return;
      }
      this.modelSvc.prepareBeforeSave();
      if (this.modelSvc.orderDTO.orderPaymentList.length == 0) {
        this.showMsg("2094");
        return;
      }

      this.isPlaceOrder = true;
      this.modelSvc.scroolToTop();
      this.dataSvc.save(this.modelSvc.orderDTO).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareAfterSave(res);
          setTimeout(() => {
            this.router.navigate(["/success"]);
          }, 1000);

          var addressPickerModel = this.modelSvc.getLocalStorage("addressPickerModel");
          if (addressPickerModel) {
            this.modelSvc.setLocalStorage("addressPickerModel", null);
            this.saveCustomerAddress(addressPickerModel);
          }
          this.salesReportService.saveSoftInvoice(res.body.invoiceID);
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.isPlaceOrder = false;
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showAddressModal() {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.data = {
        selectedAddress: GlobalMethods.jsonDeepCopy(
          this.modelSvc.selectedAddress
        ),
      };
      this.modelSvc.ref = this.dialogSvc.open(
        AddressModalComponent,
        modalConfig
      );
      this.modelSvc.ref.onClose.subscribe((obj: any) => {
        if (obj) {
          this.modelSvc.selectedAddress = obj;
          this.prepareAddress();
          this.modelSvc.setLocalStorage("selectedAddress", obj);
          this.modelSvc.preparePaymentProcessByStoreID(
            this.modelSvc.orderDTO.storeID
          );
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showStoreAddress(store:any) {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.data = {
        store: store
      }
      this.modelSvc.ref = this.dialogSvc.open(
        StoreAddressDetailComponent,
        modalConfig
      );
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  saveCustomerAddress(addressPickerModel: any) {
    try {
      this.customerModelSvc.prepareCustomerAddress(addressPickerModel);
      this.customerDataSvc
        .saveCustomerAddress(this.customerModelSvc.customerAddress)
        .subscribe({
          next: (res: any) => {},
          error: (err: any) => {
            //this.showErrorMsg(err);
          },
        });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  navigateToMap(entity:any)
  {
      let url = 'https://www.google.com/maps?q=' + entity.latitude + ',' + entity.longitude;
      window.open(url);
  }

  getRewardPointConfig() {
    try {
      let moduleName = GlobalConstants.ERP_MODULES.MKT.name;
      let pageCode = Config.marketingPageConfig.RewardPointSetup;
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
