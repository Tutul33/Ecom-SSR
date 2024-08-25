import { Injectable, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { FileUploadOption, ImageFile, ModalConfig } from 'src/app/shared/models/common.model';
import { AddonsComponent, AppMsgService, ChooseUnitComponent, Config, CustomizeComponent, DynamicDialogRef, OrderTypeComponent, SpicyOptionComponent, SwipeModalComponent } from '../..';
import { FixedIDs, GlobalConstants, GlobalMethods } from 'src/app/app-shared';
import { DutyValue, ItemSalePrice, UniqueItemDTO } from '../../models/unique-item/unique-item.model';
import { CouponModel, InvoiceMemberBenefit, Order, OrderActiveStatus, OrderDeliveryDetail, OrderItem, OrderItemComboDetail, OrderItemDuty, OrderItemOffer, OrderItemTopping, OrderPayment, OrderStatus, OrderTrack, PayProcess, PayProcessService, PaymentDetail, RedeemPointModel } from '../../models/order/order.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DialogService } from 'primeng/dynamicdialog';
import { formatDate } from '@angular/common';
import { SalesConfig } from 'src/app/sales/config';
import { SignupComponent } from 'src/app/admin';
import { FormGroup, NgForm, UntypedFormGroup } from '@angular/forms';
import { DefaultService } from 'src/app/shared/services/default.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Injectable()
export class ECommModelService {
  static instance: ECommModelService;
  validationMsgObj: any = null;
  ref: DynamicDialogRef;
  isSubmitted: boolean = false;
  isHomePage: boolean = false;
  orderActivityStatus:any = FixedIDs.activityStatus;
  currency = GlobalConstants.companyInfo.currency;
  pageConfig: any = GlobalConstants.ecomHomePageConfigModel;
  visibilityType:any = FixedIDs.visibilityType;
  showAs:any = FixedIDs.showAs;
  bannerType: any = FixedIDs.bannerType;
  topBannerList: any = [];
  middleBanner01List: any = [];
  middleBanner02List: any = [];
  middleBanner03List: any = [];
  middleBanner04List: any = [];
  bottomBannerList: any = [];
  uniqueItemList: any = [];
  itemCategories: any = [];
  mealList: any = [];
  addOnItems: any = [];
  bestSellingItems: any = [];
  availableItems: any = [];
  toppingItems: any = [];
  specialItemData: any = null;
  orderTypeCd: string = null;
  orderType: any = FixedIDs.orderType;
  selectedItem: any = null;
  itemImageList:any = [];
  mealImageList:any = [];

  orderDTO: Order = new Order();
  tempOrderDTO: Order = new Order();
  isVatApplicable: boolean = GlobalConstants.companyInfo.isVatApplicable;
  isSDApplicable: boolean = GlobalConstants.companyInfo.isSDApplicable;
  isDutyInclude: boolean = GlobalConstants.companyInfo.isDutyInclude;
  dutyFormulaDetailList: any[] = GlobalConstants.dutyFormulaDetail;

  hasVegTopping: boolean = false;
  hasNonVegTopping: boolean = false;
  hasReplaceableTopping: boolean = false;
  hasRemovableTopping: boolean = false;
  isReplaceableItemSelected: boolean = false;
  replacedItemID: number = 0;
  replacedItemDesc: string = null;
  selectedToppingList: any = [];
  totalToppingPrice: number = 0;
  totalToppingOfferPrice: number = 0;
  isEditCustomizeItem: boolean = false;


  /******************************************Delivery / Store Address and Payment Method*******************************************/
  pageConfigType: any = FixedIDs.pageConfigType;
  moduleName: string = GlobalConstants.ERP_MODULES.SLS.name;
  salesPageConfig: any = SalesConfig.salesPageConfig;
  deliveryTimeSetList: any = [];

  storeAddress: any = [];
  selectedAddress: any = null;
  minDate: Date = GlobalConstants.serverDate;
  strOpeningTime: string = null;
  strClosingTime: string = null;
  strMinTime: Date;
  strMaxTime: Date;

  tempPaymentProcessItemList:any = [];
  paymentProcessList: any = [];

  selectedMethodValue: any = null;

  tempOrderList: any = [];
  orderList: any = [];
  orderItemList: any = [];
  orderStatusList: any = FixedIDs.getList(FixedIDs.orderStatus);
  orderTrackList: any = [];


  currentSection: number = null;
  selectedCategoryID: number = null;
  sectionList:any = [];
  isScrollToAnchorClick: boolean = false;
  isFirstScrolling:boolean = true;
  scrollTimeOut: any;
  scrollPosition:any = 0;
  isScrollTopToBottom:boolean = true;
  isShowImage:boolean = true;
  activeCategoryElementList:any;
  validatorDirective:any;
  mealItemComDetailList:OrderItemComboDetail[] = [];

   //reward Point
   enableRewordPoint:boolean = false;
   enableFractionalPointCount:boolean = false;
   minimumPointsToRedeem:number = 0;
   toEarnPoints:number = 0;
   toRedeemPoints:number = 0;
 
   orderDTOList:any = [];
   
   //offer
   offerDetailList:any[] = [];
   tempOfferDetailList:any[] = [];
   offerCd:string = null;
   itemUnitPrice:number = 0;
   storeID:number = 0;
 
   serverDate:any = null;
   membershipBenefitList:any[] = [];
   availablePoint:number = 0;

  constructor(
    private configSvc: ConfigService,
    private utilitySvc: UtilityService,
    public dialogService: DialogService,
    public appMsgSvc: AppMsgService,
    private defaultSvc: DefaultService,
    private dataCacheService: DataCacheService
    ) {
    return ECommModelService.instance = ECommModelService.instance || this;
  }

  showAddOnModal() {
    const modalConfig = new ModalConfig();
    modalConfig.position = FixedIDs.modalPosition.right;
    modalConfig.height = '100%';
    modalConfig.dismissableMask = true;
    modalConfig.transitionOptions = '500ms cubic-bezier(0, 0, 0.1, 1)';

    this.ref = this.dialogService.open(AddonsComponent, modalConfig);
  }

  showSiginModal() {
    const modalConfig = new ModalConfig();
    modalConfig.position = FixedIDs.modalPosition.left;
    modalConfig.height = '100%';
    modalConfig.transitionOptions = '500ms cubic-bezier(0, 0, 0.1, 1)';

    this.ref = this.dialogService.open(SignupComponent, modalConfig);
  }

  setDefaultDataForCustomize() {
    try {
      this.hasVegTopping = false;
      this.hasNonVegTopping = false;
      this.hasReplaceableTopping = false;
      this.hasRemovableTopping = false;

      this.selectedToppingList = GlobalMethods.jsonDeepCopy(this.selectedItem.orderItemToppingList);
      this.totalToppingPrice = GlobalMethods.jsonDeepCopy(this.selectedItem.totalToppingPrice);
      this.totalToppingOfferPrice = GlobalMethods.jsonDeepCopy(this.selectedItem.totalToppingOfferPrice);
    } catch (e) {
      throw e;
    }
  }

  scroolToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  prepareBannerList(data: any) {
    try {
      this.topBannerList = [];
      this.middleBanner01List = [];
      this.middleBanner02List = [];
      this.middleBanner03List = [];
      this.middleBanner04List = [];
      this.bottomBannerList = [];

      data.forEach(element => {
        switch (element.bannerTypeCd) {
          case FixedIDs.bannerType.TopBanner:
            this.topBannerList.push(element);
            break;
          case FixedIDs.bannerType.MiddleBanner01:
            this.middleBanner01List.push(element);
            break;
          case FixedIDs.bannerType.MiddleBanner02:
            this.middleBanner02List.push(element);
            break;
          case FixedIDs.bannerType.MiddleBanner03:
            this.middleBanner03List.push(element);
            break;
          case FixedIDs.bannerType.MiddleBanner04:
            this.middleBanner04List.push(element);
            break;
          case FixedIDs.bannerType.BottomBanner:
            this.bottomBannerList.push(element);
            break;
          default:
            break;
        }
      });
    } catch (e) {
      throw e;
    }
  }

  prepareItemCategories() {
    try {
      let list = [];
      this.uniqueItemList.forEach(element => {
        let exCategory = list.find(f => f.itemDisplayCategoryID == element.itemDisplayCategoryID);
        if (!exCategory) {
          let imagefile = new ImageFile();
          imagefile.id = element.categoryImageFileID;
          imagefile.folderName = Config.imageFolders.menu;

          list.push({
            itemDisplayCategoryID: element.itemDisplayCategoryID,
            category: element.category,
            categoryImageFileID: element.categoryImageFileID,
            imageFile: imagefile
          });
        }
      });
      return list;
    } catch (e) {
      throw e;
    }
  }

  prepareAddOnItemList(data: any[]) {
    try {
      let list = [];
      if (data.length > 0) {
        data.forEach(element => {
          let uniqueItem = new UniqueItemDTO(element);
          if (uniqueItem.imageID > 0) {
            let image = this.itemImageList.find(f => f.id == uniqueItem.imageID);
            if(image)
            {
              uniqueItem.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
            }
            else{
              uniqueItem.imageFilePath = 'assets/images/no-image.png';
            }
          }
          else{
            uniqueItem.imageFilePath = 'assets/images/no-image.png';
          }

          let itemSalePrice = new ItemSalePrice(element);
          let orderItemDuty = new OrderItemDuty();
          if (GlobalConstants.companyInfo.isVatApplicable) {
            orderItemDuty.vatPercent = itemSalePrice.vATPrcnt;
            orderItemDuty.unitVatValue = itemSalePrice.vat;
            itemSalePrice.duties = itemSalePrice.duties + orderItemDuty.unitVatValue;
          }
          if (GlobalConstants.companyInfo.isSDApplicable) {
            orderItemDuty.sDPercent = itemSalePrice.sDPrcnt;
            orderItemDuty.unitSDValue = itemSalePrice.sD;
            itemSalePrice.duties = itemSalePrice.duties + orderItemDuty.unitSDValue;
          }

          if (itemSalePrice.duties > 0) {
            itemSalePrice.orderItemDutyList.entityPush(orderItemDuty);
          }

          if(!uniqueItem.isNonDiscItem)
          {
          if(!uniqueItem.isNonDiscItem && this.offerDetailList.length > 0)
            this.prepareOfferPrice(uniqueItem, false);
          }

          if (uniqueItem.allowFractionalSale) {
            uniqueItem.qty = "1.0";
          }

          let xUniqueItem: UniqueItemDTO = list.find((x) => x.uniqueItemCodeID == uniqueItem.uniqueItemCodeID);
          if (xUniqueItem) {
            xUniqueItem.isSecondaryUnit = true;
            xUniqueItem.secondaryUnitPrice = itemSalePrice.unitPrice;
            xUniqueItem.secondaryUnit = itemSalePrice.sUOMSN;
            xUniqueItem.secondaryOfferUnitPrice = uniqueItem.offerUnitPrice;
            xUniqueItem.salesPriceList.push(itemSalePrice);
            xUniqueItem.selectedItem = GlobalMethods.jsonDeepCopy(xUniqueItem);
          }
          else {
            uniqueItem.salesPriceList.push(itemSalePrice);
            if (!uniqueItem.isDelivery) uniqueItem.deliveryStatus = "Not Deliverable";
            uniqueItem.uniqueItemList.push(GlobalMethods.jsonDeepCopy(uniqueItem));
            uniqueItem.selectedItem = GlobalMethods.jsonDeepCopy(uniqueItem);
            list.push(uniqueItem);
          }
        });
      }
      return list;
    } catch (e) {
      throw e;
    }
  }

  prepareItemList(isDealItem?: boolean, uniqueItemCodeIDList?: any[], data?: any[]) {
    try {
      let list = [];
      if (data == null) data = [];

      if (isDealItem) {
        let entityList = this.uniqueItemList.filter(f => f.isDealItem == true);

        entityList.forEach(element => {
          let exMealItem = data.find(f => f.itemCode == element.itemCode);
          if(!exMealItem) data.push(GlobalMethods.jsonDeepCopy(element));
        });
      }
      else if (uniqueItemCodeIDList != null) {
        uniqueItemCodeIDList.forEach(element => {
          let entity = this.uniqueItemList.find(f => f.uniqueItemCodeID == element.uniqueItemCodeID);
          if (entity) {
            data.push(entity);
          }
        });
      }

      if (data.length > 0) {
        data.forEach(element => {
          let uniqueItem = new UniqueItemDTO(element);
          if (uniqueItem.imageID > 0) {
            if (uniqueItem.isDealItem) {
              let image = this.mealImageList.find(f => f.id == uniqueItem.imageID);
              if(image)
              {
                uniqueItem.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
              }
              else{
                uniqueItem.imageFilePath = 'assets/images/no-image.png';
              }
            }
            else {
              let image = this.itemImageList.find(f => f.id == uniqueItem.imageID);
              if(image)
              {
                uniqueItem.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
              }
              else{
                uniqueItem.imageFilePath = 'assets/images/no-image.png';
              }
            }
          }
          else {
            uniqueItem.imageFilePath = 'assets/images/no-image.png';
          }

          let itemSalePrice = new ItemSalePrice(element);
          let orderItemDuty = new OrderItemDuty();
          if (GlobalConstants.companyInfo.isVatApplicable) {
            orderItemDuty.vatPercent = itemSalePrice.vATPrcnt;
            orderItemDuty.unitVatValue = itemSalePrice.vat;
            itemSalePrice.duties = itemSalePrice.duties + orderItemDuty.unitVatValue;
          }
          if (GlobalConstants.companyInfo.isSDApplicable) {
            orderItemDuty.sDPercent = itemSalePrice.sDPrcnt;
            orderItemDuty.unitSDValue = itemSalePrice.sD;
            itemSalePrice.duties = itemSalePrice.duties + orderItemDuty.unitSDValue;
          }

          if (itemSalePrice.duties > 0) {
            itemSalePrice.orderItemDutyList.entityPush(orderItemDuty);
          }

          if(!uniqueItem.isNonDiscItem && this.offerDetailList.length > 0)
          {
            this.prepareOfferPrice(uniqueItem, false);
          }

          if (uniqueItem.allowFractionalSale) {
            uniqueItem.qty = "1.0";
          }

          let exItem = list.find(f => f.itemID == uniqueItem.itemID);
          if (exItem) {
            let xUniqueItem: UniqueItemDTO = exItem.uniqueItemList.find((x) => x.uniqueItemCodeID == uniqueItem.uniqueItemCodeID);
            if (xUniqueItem) {
              xUniqueItem.isSecondaryUnit = true;
              xUniqueItem.secondaryUnitPrice = itemSalePrice.unitPrice;
              xUniqueItem.secondaryUnit = itemSalePrice.sUOMSN;
              xUniqueItem.secondaryOfferUnitPrice = uniqueItem.offerUnitPrice;
              xUniqueItem.salesPriceList.push(itemSalePrice);
            }
            else {
              uniqueItem.salesPriceList.push(itemSalePrice);
              if(uniqueItem.isDefault)
              {
                exItem.uniqueItemCodeID = GlobalMethods.jsonDeepCopy(uniqueItem.uniqueItemCodeID);
                exItem.selectedItem = GlobalMethods.jsonDeepCopy(uniqueItem);
              }
              exItem.uniqueItemList.push(uniqueItem);
            }
          }
          else {
            uniqueItem.salesPriceList.push(itemSalePrice);
            if (!uniqueItem.isDelivery) uniqueItem.deliveryStatus = "Not Deliverable";
            uniqueItem.uniqueItemList.push(GlobalMethods.jsonDeepCopy(uniqueItem));
            uniqueItem.selectedItem = GlobalMethods.jsonDeepCopy(uniqueItem);
            list.push(uniqueItem);
          }
        });
      }
      return list;
    } catch (e) {
      throw e;
    }
  }

  prepareUniqueItemList(categoryIDs?: string) {
    try {
      let list = [];
      let data = [];
      if (categoryIDs) {
        let categoryIDList = categoryIDs.split(',');
        categoryIDList.forEach(element => {
          let entityList = this.uniqueItemList.filter(f => f.itemDisplayCategoryID == element);
          if(entityList.length > 0)
          {
            if(data.length == 0)
            {
              data = GlobalMethods.jsonDeepCopy(entityList)
            }
            else{
              data = [...data, ...GlobalMethods.jsonDeepCopy(entityList)];
            }
          }
        });
      }
      else {
        data = GlobalMethods.jsonDeepCopy(this.uniqueItemList);
      }

      if (data.length > 0) {
        data.forEach(element => {
          let uniqueItem = new UniqueItemDTO(element);
          if (uniqueItem.imageID > 0) {
            if (uniqueItem.isDealItem) {
              let image = this.mealImageList.find(f => f.id == uniqueItem.imageID);
              if(image)
              {
                uniqueItem.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
              }
              else{
                uniqueItem.imageFilePath = 'assets/images/no-image.png';
              }
            }
            else {
              let image = this.itemImageList.find(f => f.id == uniqueItem.imageID);
              if(image)
              {
                uniqueItem.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
              }
              else{
                uniqueItem.imageFilePath = 'assets/images/no-image.png';
              }
            }
          }
          else{
            uniqueItem.imageFilePath = 'assets/images/no-image.png';
          }

          let itemSalePrice = new ItemSalePrice(element);
          let orderItemDuty = new OrderItemDuty();
          if (GlobalConstants.companyInfo.isVatApplicable) {
            orderItemDuty.vatPercent = itemSalePrice.vATPrcnt;
            orderItemDuty.unitVatValue = itemSalePrice.vat;
            itemSalePrice.duties = itemSalePrice.duties + orderItemDuty.unitVatValue;
          }
          if (GlobalConstants.companyInfo.isSDApplicable) {
            orderItemDuty.sDPercent = itemSalePrice.sDPrcnt;
            orderItemDuty.unitSDValue = itemSalePrice.sD;
            itemSalePrice.duties = itemSalePrice.duties + orderItemDuty.unitSDValue;
          }

          if (itemSalePrice.duties > 0) {
            itemSalePrice.orderItemDutyList.entityPush(orderItemDuty);
          }
          
          if(!uniqueItem.isNonDiscItem && this.offerDetailList.length > 0)
          {
            this.prepareOfferPrice(uniqueItem, false);
          }

          if (uniqueItem.allowFractionalSale) {
            uniqueItem.qty = "1.0";
          }

          let exEntity = list.find(f => f.itemDisplayCategoryID == element.itemDisplayCategoryID);
          if (exEntity) {
            let exItem = exEntity.itemList.find(f => f.itemID == uniqueItem.itemID);
            if (exItem) {
              let xUniqueItem: UniqueItemDTO = exItem.uniqueItemList.find((x) => x.uniqueItemCodeID == uniqueItem.uniqueItemCodeID);
              if (xUniqueItem) {
                xUniqueItem.isSecondaryUnit = true;
                xUniqueItem.secondaryUnitPrice = itemSalePrice.unitPrice;
                xUniqueItem.secondaryUnit = itemSalePrice.sUOMSN;
                xUniqueItem.secondaryOfferUnitPrice = uniqueItem.offerUnitPrice;
                xUniqueItem.salesPriceList.push(itemSalePrice);

                if(xUniqueItem.isDefault)
                {
                  exItem.selectedItem = GlobalMethods.jsonDeepCopy(xUniqueItem);
                }
              }
              else {
                uniqueItem.salesPriceList.push(itemSalePrice);
                if(uniqueItem.isDefault)
                {
                  exItem.uniqueItemCodeID = GlobalMethods.jsonDeepCopy(uniqueItem.uniqueItemCodeID);
                  exItem.selectedItem = GlobalMethods.jsonDeepCopy(uniqueItem);
                }
                exItem.uniqueItemList.push(uniqueItem);
              }
            }
            else {
              uniqueItem.salesPriceList.push(itemSalePrice);
              uniqueItem.uniqueItemCodeID = GlobalMethods.jsonDeepCopy(uniqueItem.uniqueItemCodeID);
              uniqueItem.uniqueItemList.push(GlobalMethods.jsonDeepCopy(uniqueItem));
              uniqueItem.selectedItem = GlobalMethods.jsonDeepCopy(uniqueItem);
              exEntity.itemList.push(uniqueItem);
            }
          }
          else {
            let newEntity = {
              itemDisplayCategoryID: element.itemDisplayCategoryID,
              category: element.category,
              itemList: []
            };
            uniqueItem.salesPriceList.push(itemSalePrice);
           
            if (!uniqueItem.isDelivery) uniqueItem.deliveryStatus = "Not Deliverable";
            uniqueItem.uniqueItemList.push(GlobalMethods.jsonDeepCopy(uniqueItem));
            uniqueItem.selectedItem = GlobalMethods.jsonDeepCopy(uniqueItem);
            newEntity.itemList.push(uniqueItem);
            list.push(newEntity);
          }
        });
      }
      return list;
    } catch (e) {
      throw e;
    }
  }

  prepareToppingItemList(data: any) {
    try {
      let list = [];
      let offerDiscPerc = 0;
      let offerAmount = 0;
      if(this.selectedItem.offerUnitPrice > 0)
      {
        if(this.selectedItem.offerUnitPrice == this.selectedItem.unitPrice)
        {
          offerDiscPerc = 100;
        }
        else{
          offerDiscPerc = (100 * (this.selectedItem.unitPrice - this.selectedItem.offerUnitPrice)) / this.selectedItem.unitPrice;
        }
      }

      if (data.length > 0) {
        data.forEach(element => {
          let entity = new OrderItemTopping(element);
          if (GlobalConstants.companyInfo.isDutyInclude && entity.toppingCategoryCd) {
            let dutyValue = new DutyValue();
            dutyValue.vatPercent = this.selectedItem.salesPriceList[0].vATPrcnt || 0;
            dutyValue.sDPercent = this.selectedItem.salesPriceList[0].sDPrcnt || 0;

            if (dutyValue.vatPercent > 0 || dutyValue.sDPercent > 0) {
              dutyValue.amount = entity.price;
              GlobalConstants.companyInfo.isDutyInclude = false;
              GlobalConstants.dutyFormulaDetail = GlobalConstants.dutyFormulaDetail.reverse();
              dutyValue = this.calculateDutiesValue(dutyValue);
              GlobalConstants.companyInfo.isDutyInclude = true;
              GlobalConstants.dutyFormulaDetail = GlobalConstants.dutyFormulaDetail.reverse();
              entity.price = Number(GlobalMethods.convertToDecimal(dutyValue.amount + dutyValue.vatValue + dutyValue.sDValue, 2));
            }

            if(offerDiscPerc > 0)
            {
              if(offerDiscPerc == 100)
              {
                entity.offerUnitPrice = 0; 
              }
              else{
                offerAmount = entity.price * (offerDiscPerc / 100);
                entity.offerUnitPrice = entity.price - offerAmount;
              }
            }
          }
          if (entity.toppingCategoryCd == FixedIDs.toppingItemCategories[0].code) if (this.hasVegTopping == false) this.hasVegTopping = true;
          if (entity.toppingCategoryCd == FixedIDs.toppingItemCategories[1].code) if (this.hasNonVegTopping == false) this.hasNonVegTopping = true;
          if (entity.isReplaceable) if (this.hasReplaceableTopping == false) this.hasReplaceableTopping = true;
          if (entity.isRemoval) if (this.hasRemovableTopping == false) this.hasRemovableTopping = true;


          if (this.selectedToppingList.length > 0) {
            if (entity.toppingCategoryCd) {
              let addedItem = this.selectedToppingList.find(f => f.toppingItemCodeID == entity.toppingItemCodeID && f.isAdded == true);
              if (addedItem) {
                entity.isChecked = true;
              }

              let replacedItem = this.selectedToppingList.find(f => f.toppingItemCodeID == entity.toppingItemCodeID && f.isReplaced == true);
              if (replacedItem) {
                entity.isReplaced = true;
              }
            }

            if (entity.isRemoval) {
              let removedItem = this.selectedToppingList.find(f => f.toppingItemCodeID == entity.toppingItemCodeID && f.isRemoved == true);
              if (removedItem) {
                entity.isRemoved = true;
              }
            }

            if (entity.isReplaceable) {
              let replacedItem = this.selectedToppingList.find(f => f.replacedItemCodeID == entity.toppingItemCodeID && f.isReplaced == true);
              if (replacedItem) {
                entity.isChecked = true;
                this.isReplaceableItemSelected = true;
                this.replacedItemID = GlobalMethods.jsonDeepCopy(entity.toppingItemCodeID);
                this.replacedItemDesc = GlobalMethods.jsonDeepCopy(entity.variationsName);
              }
            }
          }
          list.push(entity);
        });
      }
      return list;
    } catch (e) {
      throw e;
    }
  }

  setSpecialItemToLocalStorage(title: string, list: []) {
    try {
      this.specialItemData = {
        title: title,
        list: list
      };
      this.configSvc.setLocalStorage('specialItemData', this.specialItemData);
    } catch (e) {
      throw e;
    }
  }
  getSpecialItemFromLocalStorage() {
    try {
      return this.configSvc.getLocalStorage('specialItemData');
    } catch (e) {
      throw e;
    }
  }

  setSelectedItem(item: any) {
    try {
      let selectedItem = item.uniqueItemList.find(f => f.uniqueItemCodeID == item.uniqueItemCodeID);
      item.selectedItem = GlobalMethods.jsonDeepCopy(selectedItem);
    } catch (e) {
      throw e;
    }
  }

  private addItemToCart(entity: UniqueItemDTO) {
    try {
      let item = new OrderItem(GlobalMethods.jsonDeepCopy(entity));
      item.qty = Number(item.qty);
      if(entity.allowFractionalSale)
      {
        entity.qty = "1.0";
      }
      else{
        entity.qty = "1";
      }
      entity.totalToppingPrice = 0;
      entity.orderItemToppingList = [];
      
      if (item.orderItemToppingList.length > 0) this.prepareTopingItemDescription(item);

      let itemSalePrice = GlobalMethods.jsonDeepCopy(entity.salesPriceList[0]);
      if (entity.selectedUnitID > 0) {
        itemSalePrice = GlobalMethods.jsonDeepCopy(entity.salesPriceList.find(f => f.uOMID == Number(entity.selectedUnitID)));
      }
      entity.selectedUnitID = null;
      entity.selectedUOMSN = null;
      item.uOMID = itemSalePrice.uOMID;
      item.sUOMSN = itemSalePrice.sUOMSN;
      item.unitPrice = itemSalePrice.unitPrice;
      item.orderItemDutyList = itemSalePrice.orderItemDutyList;
      item.allowFractionalSale = itemSalePrice.allowFractionalSale;
      item.customerID = this.orderDTO.customerID;

      if(entity.isDealItem)
      {
        item.mealID = entity.uniqueItemCodeID;
        item.uniqueItemCodeID = null;
      }
      else{
        let exItem = this.orderDTO.orderItemList.find(element => element.uniqueItemDetail == item.uniqueItemDetail && element.uOMID == item.uOMID && element.itemCode == item.itemCode);
        if (exItem) {
          exItem.qty += item.qty;
          this.updateQty(exItem);
          return;
        }
      }

      if (!item.totalToppingPrice) item.totalToppingPrice = 0;
      item.totalPrice = item.qty * (Number(item.unitPrice) + Number(item.totalToppingPrice));
      

      item.orderItemDutyList = GlobalMethods.jsonDeepCopy(itemSalePrice.orderItemDutyList);
      item.orderItemDutyList.forEach(duty => {
        let dutyValue = new DutyValue();
        dutyValue.vatPercent = duty.vatPercent || 0;
        dutyValue.sDPercent = duty.sDPercent || 0;
        dutyValue.amount = item.totalPrice;
        dutyValue = this.calculateDutiesValue(dutyValue);

        if (this.isVatApplicable) {
          duty.vatValue = dutyValue.vatValue;
        }
        if (this.isSDApplicable) {
          duty.sDValue = dutyValue.sDValue;
        }
      });
      item.id = 0;
      if(item.orderItemComboDetailList.length > 0)
      {
        this.prepareMealItemInfo(item);
      }
      this.orderDTO.orderItemList.entityPush(item);
      
      this.prepareOfferDiscount(this.orderDTO);
      this.calculateTotalPrice();
      this.setLocalStorage('orderDTO', this.orderDTO);

      if (this.orderDTO.orderItemList.length == 1 && !entity.isAddonItem) {
        setTimeout(() => {
          this.showAddOnModal();
        }, 1500);
      }
    } catch (e) {
      throw (e);
    }
  }

  prepareMealItemInfo(entity: OrderItem){
    try {

      

      let mealItemInfo = null;
      let list = [];
      entity.orderItemComboDetailList.forEach(element => {
          let exEntity = list.find(f => f.variationsName == element.variationsName && f.spiceCd == element.spiceCd);
          if(exEntity)
          {
            exEntity.qty += element.qty;
            exEntity.mealItemInfo = element.variationsName + ' ' + exEntity.qty + element.sUOMSN + (element.spiceOption == null ? '' : ' (' + element.spiceOption + ')' )
          } 
          else{
            mealItemInfo = element.variationsName + ' ' + element.qty + element.sUOMSN + (element.spiceOption == null ? '' : ' (' + element.spiceOption + ')' )
            list.push({
              variationsName: element.variationsName,
              mealItemInfo : mealItemInfo,
              spiceCd: element.spiceCd,
              qty: element.qty
            });
          }
      });
      mealItemInfo = list.map(m => m.mealItemInfo).join(', ');
      entity.variationsName = entity.variationsName + ' [ ' + mealItemInfo + ' ]';
    } catch (e) {
      throw e;
    }
  }

  calculateTotalPrice() {
    try {
      let tempList = this.orderDTO.orderItemList.filter(x => x.tag != FixedIDs.objectState.deleted);
      tempList = tempList.filter(x => !x.isCancelled || x.isCancelled == false);

      if (tempList.length > 0) {
        this.orderDTO.subTotal = tempList.map(a => a.totalPrice).reduce(function (a, b) {
          if (!a) a = 0;
          if (!b) b = 0;
          return (Number(a) + Number(b));
        });

        this.orderDTO.totalDiscount = 0;
          this.orderDTO.membershipDiscount = 0;
          let totalDuty = 0, totalDutyWithoutDisc = 0, vatSum = 0, sdSum = 0, vatDiscSum = 0, sdDiscSum = 0, nonDiscAmount = 0, orderSubTotal = 0; 
          tempList.forEach((element) => {
            element.orderItemDutyList.forEach((duty) => {
              if (duty.tag != FixedIDs.objectState.deleted) {
                vatSum = Number(duty.vatValue) + vatSum;
                sdSum = Number(duty.sDValue) + sdSum;
                vatDiscSum = Number(duty.vatDiscount) + vatDiscSum;
                sdDiscSum = Number(duty.sDDiscount) + sdDiscSum;
              }
            });

            if(element.offerUnitDiscount > 0 || element.membershipUnitDiscount > 0)
            {
              this.orderDTO.totalDiscount += element.offerUnitDiscount *  Number(element.qty);
              this.orderDTO.membershipDiscount += element.membershipUnitDiscount *  Number(element.qty);
            }

            if(element.isNonDiscItem)
            {
              nonDiscAmount += element.totalPrice;
            }

            if(this.isDutyInclude)
            {
              orderSubTotal += (element.totalPrice - element.duties);
            }
            else{
              orderSubTotal += element.totalPrice;
            }
          });

          this.orderDTO.vat = vatSum - vatDiscSum;
          this.orderDTO.sD = sdSum - sdDiscSum;
          totalDuty = totalDuty + vatSum + sdSum - vatDiscSum - sdDiscSum;
          totalDutyWithoutDisc = vatSum + sdSum;

        this.orderDTO.totalDuties = totalDuty;
        if (this.isDutyInclude == true) {
          this.orderDTO.totalAmount = this.orderDTO.subTotal + this.orderDTO.deliveryCharge - this.orderDTO.totalDiscount - this.orderDTO.membershipDiscount;
        }
        else {
          this.orderDTO.totalAmount = this.orderDTO.subTotal + totalDutyWithoutDisc + this.orderDTO.deliveryCharge - this.orderDTO.totalDiscount - this.orderDTO.membershipDiscount;
        }

        if(this.orderDTO.invoicePaymentDetail.pointAmount > 0)
        {
          this.orderDTO.roundAmount = this.calculatePayableAmount(this.orderDTO.totalAmount - this.orderDTO.invoicePaymentDetail.pointAmount);
        }
        else{
          this.orderDTO.roundAmount = this.calculatePayableAmount(this.orderDTO.totalAmount);
        }
      }
      else {
        this.orderDTO.vat = 0;
        this.orderDTO.sD = 0;
        this.orderDTO.subTotal = 0;
        this.orderDTO.totalAmount = 0;
        this.orderDTO.totalDuties = 0;
        this.orderDTO.roundAmount = 0;
        this.orderDTO.totalDiscount = 0;
      }
    } catch (e) {
      throw e;
    }
  }

  calculatePayableAmount(num: number) {
    return Math.round(num);
  }

  updateQty(entity: any) {
    try {
      let quantity = Number(entity.qty);
      if (quantity < 0) entity.qty = 1;
      else entity.qty = quantity;
      let itemDuty = 0;
      let discDuties = 0;

      if (entity.totalToppingPrice && entity.totalToppingPrice > 0) entity.totalPrice = entity.qty * (Number(entity.unitPrice) + Number(entity.totalToppingPrice));
      else entity.totalPrice = entity.qty * Number(entity.unitPrice);

      entity.orderItemDutyList?.forEach(duty => {

        let dutyValue = new DutyValue();
        dutyValue.vatPercent = duty.vatPercent || 0;
        dutyValue.sDPercent = duty.sDPercent || 0;
        dutyValue.amount = entity.totalPrice;
        dutyValue = this.calculateDutiesValue(dutyValue);

        let discDutyValue = new DutyValue();

        if (entity.unitDiscPrice > 0) {
          entity.discountPrice = entity.unitDiscPrice * entity.qty;
          discDutyValue.amount = entity.discountPrice;
          discDutyValue.vatPercent = duty.vatPercent || 0;
          discDutyValue.sDPercent = duty.sDPercent || 0;
          discDutyValue = this.calculateDutiesValue(discDutyValue);
        }

        if (this.isVatApplicable) {
          duty.vatValue = dutyValue.vatValue;
          duty.vatDiscount = discDutyValue.vatValue;
          itemDuty = itemDuty + duty.vatValue;
          discDuties = discDuties + duty.vatDiscount;
        }
        if (this.isSDApplicable) {
          duty.sDValue = dutyValue.sDValue;
          duty.sDDiscount = discDutyValue.sDValue;
          itemDuty = itemDuty + duty.sDValue;
          discDuties = discDuties + duty.sDDiscount;
        }

        if (duty.id == 0) duty.setInsertTag();
        if (duty.id > 0) duty.setModifyTag();
        if (entity.tag == FixedIDs.objectState.deleted) duty.setDeleteTag();
      });

      entity.itemDetail = '';
      entity.addedToppings = '';
      entity.removedToppings = '';
      entity.replacedToppings = '';

      entity.orderItemToppingList?.forEach(toping => {
        if (toping.isAdded == true && toping.tag != FixedIDs.objectState.deleted) entity.addedToppings = entity.addedToppings + toping.variationsName + ' - ' + toping.qty + ', ';
        if (toping.isRemoved == true && toping.tag != FixedIDs.objectState.deleted) entity.removedToppings = entity.removedToppings + toping.variationsName + ', ';
        if (toping.isReplaced == true && toping.tag != FixedIDs.objectState.deleted) entity.replacedToppings = toping.replacedItemDescription + ' with ' + entity.replacedToppings + toping.variationsName + ', ';
      });

      entity.duties = itemDuty;
      entity.discountDuties = discDuties;

      entity.discountPrice = entity.qty * Number(entity.unitDiscPrice);
      if (entity.id > 0) entity.setModifyTag();
      else entity.setInsertTag();
      this.prepareOfferDiscount(this.orderDTO);
      this.calculateTotalPrice();
      this.setLocalStorage('orderDTO', this.orderDTO);
    } catch (e) {
      throw (e);
    }
  }

  prepareItemDetail(item: any) {
    try {
      let itemDetail = '';
      if (item.addedToppings.length > 0) {
        itemDetail = 'Added: ' + item.addedToppings;
      }
      if (item.removedToppings.length > 0) {
        if (item.addedToppings.length > 0) itemDetail = itemDetail + '#*';
        itemDetail = itemDetail + ' Removed: ' + item.removedToppings;
      }

      if (item.replacedToppings.length > 0) {
        if (item.addedToppings.length > 0 || item.removedToppings.length > 0) itemDetail = itemDetail + '#*';
        itemDetail = itemDetail + ' Replaced: ' + item.replacedToppings;
      }

      itemDetail = this.removeLastCommaFromString(itemDetail);
      return itemDetail;
    } catch (e) {
      throw (e);
    }
  }

  removeLastCommaFromString(str: string) {
    if (str && str.length > 0) return str.replace(/,\s*$/, "");
    else return str;
  }

  calculateDutiesValue(dutyValue: DutyValue) {
    try {
      if (GlobalConstants.companyInfo.isDutyInclude) {
        if (GlobalConstants.dutyFormulaDetail.length > 0) {

          for (let index = 0; index < GlobalConstants.dutyFormulaDetail.length; index++) {
            const dutyCd = GlobalConstants.dutyFormulaDetail[index].dutyCd;
            switch (dutyCd) {
              case 'VAT':
                dutyValue.vatValue = Number(GlobalMethods.vatDI(dutyValue.amount, dutyValue.vatPercent));
                break;

              case 'SD':
                dutyValue.sDValue = Number(GlobalMethods.sdDI(dutyValue.amount, Number(dutyValue.vatValue), dutyValue.sDPercent));
                break;

              default:
                break;
            }
          }
        }
      }
      else {
        if (GlobalConstants.dutyFormulaDetail.length > 0) {
          for (let index = 0; index < GlobalConstants.dutyFormulaDetail.length; index++) {
            const dutyCd = GlobalConstants.dutyFormulaDetail[index].dutyCd;
            switch (dutyCd) {
              case 'VAT':
                dutyValue.vatValue = Number(GlobalMethods.vatDE(dutyValue.amount, Number(dutyValue.sDValue), dutyValue.vatPercent));
                break;

              case 'SD':
                dutyValue.sDValue = Number(GlobalMethods.sdDE(dutyValue.amount, dutyValue.sDPercent));
                break;

              default:
                break;
            }
          }
        }
      }
      return dutyValue;
    } catch (e) {
      throw e;
    }
  }

  prepareTopingItemDescription(item: OrderItem) {
    try {
      item.addedToppings = '';
      item.removedToppings = '';
      item.replacedToppings = '';
      item.itemDetail = '';
      item.displayItemDetail = '';
      this.setTopingItemDescription(item);
      item.itemDetail = this.prepareItemDetail(item);
      item.displayItemDetail = (item.spiceOption == null ? "" : "(" + item.spiceOption + ") ") + item.itemDetail.split("#*").join(', ');

      let spiceCd = item.spiceCd ? item.spiceCd : '';

      item.uniqueItemDetail = item.itemCode + item.itemDetail + spiceCd;
    } catch (e) {
      throw (e);
    }
  }


  private setTopingItemDescription(item: any) {
    try {
      let addedTopping = [];
      let removeTopping = [];
      let itemDetail = null;

      item.orderItemToppingList?.forEach(toping => {
        if (toping.isAdded == true) {
          itemDetail = toping.variationsName + ' - ' + toping.qty;
          addedTopping.push(itemDetail);
        }
        if (toping.isRemoved == true) {
          itemDetail = toping.variationsName;
          removeTopping.push(itemDetail);
        }
        if (toping.isReplaced == true) {
          item.replacedToppings = toping.replacedItemDescription + ' with ' + item.replacedToppings + toping.variationsName;
        }
      });

      if (addedTopping.length > 0) {
        item.addedToppings = addedTopping.join(',');
      }
      if (removeTopping.length > 0) {
        item.removedToppings = removeTopping.join(',');
      }
    } catch (e) {
      throw (e);
    }
  }
  removeItem(entity: any) {
    try {
      this.utilitySvc.deleteCollection(this.orderDTO.orderItemList, entity);
      this.prepareOfferDiscount(this.orderDTO);
      this.calculateTotalPrice();
      if (this.orderDTO.orderItemList.length == 0) {
        this.resetModel();
      }
      else {
        this.setLocalStorage('orderDTO', this.orderDTO);
      }
    } catch (e) {
      throw (e);
    }
  }

  resetModel() {
    try {
      this.orderDTO = new Order();
      this.orderTypeCd = null;
      this.selectedAddress = null;
      this.selectedMethodValue = null;
      this.setLocalStorage('orderDTO', this.orderDTO);
      this.modifyOfferItem();
    } catch (e) {
      throw e;
    }
  }

  setLocalStorage(key: string, value: any) {
    this.configSvc.setLocalStorage(key, value);
  }


  addToCart(item: UniqueItemDTO, formGroup?: NgForm, formID?:any) {
    try {
      if(formGroup)
      {
        formID = formID == null ? item.itemID : formID;
        let itemForm = formGroup.form.controls['item' + formID] as UntypedFormGroup;
        if (!itemForm.valid) {
          return;
        }
      }
      if(item.isCustomize)
      {
        this.selectedItem = GlobalMethods.jsonDeepCopy(item);
        if(item.allowFractionalSale)
        {
          item.qty = "1.0";
        }
        else{
          item.qty = "1";
        }
      }
      else{
        this.selectedItem = item;
      }
      if (this.orderTypeCd == null) {
        if(item.isCustomize) item.isCustomize = false;
        this.showOrderTypeModal();
      }
      else {
        if(this.selectedItem.isDealItem)
        {
          this.prepareItemComboDetail(this.selectedItem);
          if(this.selectedItem.isSwipable)
          {
            this.showSwipeModal(this.selectedItem, false);
          }
          else{
            this.addItemToCart(this.selectedItem);
          }
        }
        else{
          if (this.selectedItem.isSecondaryUnit) {
            this.showChooseUnitModal();
          }
          else {
            if (item.isSecondaryUnit) {
              if(item.isCustomize) item.isCustomize = false;
              this.showChooseUnitModal();
            }
            else {
              if (item.isCustomize) {
                item.isCustomize = false;
                this.showCustomizeModal();
              }
              else {
                if (item.isSpicy) {
                  this.showSpicyModal();
                }
                else {
                  this.addItemToCart(this.selectedItem);
                }
              }
            }
          }
        }
      }
    } catch (e) {
      throw (e);
    }
  }

  showOrderTypeModal() {
    try {
      const modalConfig = new ModalConfig();

      this.ref = this.dialogService.open(OrderTypeComponent, modalConfig);
      this.ref.onClose.subscribe((orderTypeCd: any) => {
        
        if (orderTypeCd) {
          if (orderTypeCd == FixedIDs.orderType.Delivery && !this.selectedItem.isDelivery) {
            this.appMsgSvc.showMessage('2093');
            this.orderTypeCd = null;
            return;
          }
          else {
            this.orderDTO.orderTypeCd = GlobalMethods.jsonDeepCopy(orderTypeCd);
          }

          if (orderTypeCd == FixedIDs.orderType.Delivery) {
            this.orderDTO.deliveryCharge = GlobalConstants.companyInfo.deliveryCharge;
          }
          
          this.modifyOfferItem();


          this.setLocalStorage('orderDTO', this.orderDTO);
          if(this.selectedItem.isDealItem)
          {
            this.prepareItemComboDetail(this.selectedItem);
            if(this.selectedItem.isSwipable)
            {
              this.showSwipeModal(this.selectedItem, false);
            }
            else{
              this.addItemToCart(this.selectedItem);
            }
          }
          else{
            if (this.selectedItem.isSecondaryUnit) {
              this.showChooseUnitModal();
            }
            else {
              if (this.selectedItem.isCustomize) {
                this.selectedItem.isCustomize = false;
                this.showCustomizeModal();
              }
              else {
                if (this.selectedItem.isSpicy) {
                  this.showSpicyModal();
                }
                else {
                  this.addItemToCart(this.selectedItem);
                }
              }
            }
          }
        }
        else{
          this.orderTypeCd = null;
        }
      });
    } catch (e) {
      throw (e);
    }
  }

  modifyOfferItem()
  {
    try {
      this.offerDetailList = GlobalMethods.jsonDeepCopy(this.tempOfferDetailList);
      if(this.orderDTO.storeID > 0)
      {
        this.offerDetailList = this.offerDetailList.filter(f => f.storeID == this.orderDTO.storeID);
      }
      if(GlobalConstants.customerInfo.id > 0)
      {
        this.offerDetailList = this.offerDetailList.filter(f => f.memberID == GlobalConstants.customerInfo.id || f.memberID == null);
      }
      this.mealList.forEach(item => {
        this.prepareOfferPrice(item, false);
        if(item.secondaryUnitPrice > 0)
        {
          this.prepareOfferPrice(item, true);
        }
      });
      this.bestSellingItems.forEach(item => {
        this.prepareOfferPrice(item, false);
        if(item.secondaryUnitPrice > 0)
        {
          this.prepareOfferPrice(item, true);
        }
      });
      this.addOnItems.forEach(item => {
        this.prepareOfferPrice(item.selectedItem, false);
        if(item.selectedItem.secondaryUnitPrice > 0)
        {
          this.prepareOfferPrice(item.selectedItem, true);
        }
      });
      this.availableItems.forEach(category => {
        category.itemList.forEach(mainItem => {
          mainItem.selectedItem.unitPrice
          this.prepareOfferPrice(mainItem.selectedItem, false);
          if(mainItem.selectedItem.secondaryUnitPrice > 0)
          {
            this.prepareOfferPrice(mainItem.selectedItem, true);
          }

          mainItem.uniqueItemList.forEach(item => {
            this.prepareOfferPrice(item, false);
            if(item.secondaryUnitPrice > 0)
            {
              this.prepareOfferPrice(item, true);
            }
          });
        });
      });
    } catch (e) {
      throw e;
    }
  }

  showChooseUnitModal() {
    try {
      const modalConfig = new ModalConfig();

      this.ref = this.dialogService.open(ChooseUnitComponent, modalConfig);
      this.ref.onClose.subscribe((selectedUnit: any) => {
        if (selectedUnit) {
          if (this.selectedItem.isCustomize) {
            this.selectedItem.isCustomize = false;
            this.showCustomizeModal();
          }
          else {
            if (this.selectedItem.isSpicy) {
              this.showSpicyModal();
            }
            else {
              this.addItemToCart(this.selectedItem);
            }
          }
        }
      });
    } catch (e) {
      throw e;
    }
  }

  showSwipeModal(entity:any, isModify:boolean) {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.data = {
        entity: GlobalMethods.jsonDeepCopy(entity)
      }
      this.ref = this.dialogService.open(SwipeModalComponent, modalConfig);
      this.ref.onClose.subscribe((data: any) => {
        if(isModify)
        {
          if(data)
          {
            this.prepareSwipeData(data);
            if(this.selectedItem.qty > 0)
            {
              this.updateQty(this.selectedItem);
            }
          }
        }
        else{
          if(data)
          {
            this.addItemToCart(data);
          }
          else{
            this.addItemToCart(entity);
          }
        }
      });
    } catch (e) {
      throw e;
    }
  }


  showSpicyModal() {
    try {
      const modalConfig = new ModalConfig();

      this.ref = this.dialogService.open(SpicyOptionComponent, modalConfig);
      this.ref.onClose.subscribe((spicyOptionList: any) => {

        if (spicyOptionList.length > 0) {
          spicyOptionList.forEach(element => {
            let spicyItem: UniqueItemDTO = GlobalMethods.jsonDeepCopy(this.selectedItem);
            spicyItem.qty = element.qty;
            spicyItem.spiceCd = element.value.code;
            spicyItem.spiceOption = element.value.value;
            spicyItem.selectedUnitID = GlobalMethods.jsonDeepCopy(this.selectedItem.selectedUnitID);

            if (spicyItem.orderItemToppingList.length == 0) {
              spicyItem.uniqueItemDetail = spicyItem.itemCode + spicyItem.spiceCd;
            }
            spicyItem.displayItemDetail = "(" + spicyItem.spiceOption + ") " + (spicyItem.displayItemDetail == null ? "" : spicyItem.displayItemDetail);
            this.addItemToCart(spicyItem);
          });
        }
        if(this.selectedItem.allowFractionalSale)
        {
          this.selectedItem.qty = "1.0";
        }
        else{
          this.selectedItem.qty = "1";
        }
        this.selectedItem.selectedUnitID = null;
        this.selectedItem.selectedUOMSN = null;
      });
    } catch (e) {
      throw e;
    }
  }

  showCustomizeModal() {
    try {
      const modalConfig = new ModalConfig();

      this.ref = this.dialogService.open(CustomizeComponent, modalConfig);
      this.ref.onClose.subscribe((data: any) => {
        this.isReplaceableItemSelected = false;
        if (data == undefined) {
          this.selectedItem.isCustomize = false;
          if (this.isEditCustomizeItem) this.isEditCustomizeItem = false;
        }
        else {
          if (data.length > 0) {
            if (this.isEditCustomizeItem) {
              this.isEditCustomizeItem = false;
              this.updateCustomizeItem();
            }
            else {
              if (this.selectedItem.isSpicy) {
                this.showSpicyModal();
              }
              else {
                this.addItemToCart(this.selectedItem);
              }
            }
          }
        }
      });
    } catch (e) {
      throw e;
    }
  }


  updateCustomizeItem() {
    try {
      let entity = this.orderDTO.orderItemList.find(f => f.id == this.selectedItem.id) as OrderItem;
      entity.qty = this.selectedItem.qty;
      entity.orderItemToppingList = this.selectedItem.orderItemToppingList;
      entity.totalToppingPrice = this.selectedItem.totalToppingPrice;
      entity.totalToppingOfferPrice = this.selectedItem.totalToppingOfferPrice;

      this.prepareTopingItemDescription(entity);
      let exItem = this.orderDTO.orderItemList.find(element => element.uniqueItemDetail == entity.uniqueItemDetail && element.uOMID == entity.uOMID && element.itemCode == entity.itemCode && element.id != entity.id);
      if (exItem) {
        exItem.qty += entity.qty;
        this.utilitySvc.deleteCollection(this.orderDTO.orderItemList, entity);
        this.updateQty(exItem);
      }
      else {
        this.updateQty(entity);
      }
      this.selectedItem = null;
    } catch (e) {
      throw e;
    }
  }



  onChangeQuantity(entity: any) {
    try {
      if (isNaN(entity.qty) || entity.qty == "" || entity.qty == 0) {
        entity.qty = 1;
      }
      this.updateQty(entity);
      if (entity.id > 0) entity.setModifyTag();
    }
    catch (e) {
      throw e;
    }
  }
  onClickMinus(entity: any, isUpdateInCart: boolean) {
    try {
      if (entity.qty > 1) {
        entity.qty--;
        if (isUpdateInCart) {
          this.onChangeQuantity(entity);
        }
      }
    } catch (e) {
      throw e;
    }
  }
  onClickPlus(entity: any, isUpdateInCart: boolean) {
    try {
      if (entity.qty < 999) {
        entity.qty++;
        if (isUpdateInCart) {
          this.onChangeQuantity(entity);
        }
      }
    } catch (e) {
      throw e;
    }
  }


  initDefaultOrder() {
    try {
      this.orderDTO = new Order();
      this.orderDTO.orderActiveStatus = this.prepareOrderActiveStatus(this.orderDTO);
      this.orderDTO.orderStatus = new OrderStatus();
    } catch (e) {
      throw e;
    }
  }

  prepareOrderStatus(entity: any) {
    try {
      let orderStatus = new OrderStatus();
      orderStatus.orderID = entity.orderID;
      orderStatus.customerID = entity.customerID;
      return orderStatus;
    } catch (e) {
      throw (e);
    }
  }

  prepareOrderActiveStatus(entity: any) {
    try {
      let orderActiveStatus = new OrderActiveStatus();
      orderActiveStatus.orderID = entity.orderID;
      return orderActiveStatus;
    } catch (e) {
      throw (e);
    }
  }

  prepareDefaultData() {
    try {
      let orderInfo = this.getLocalStorage("orderDTO");
      if (orderInfo) {
        this.orderDTO = orderInfo as Order;
        this.orderTypeCd = GlobalMethods.jsonDeepCopy(this.orderDTO.orderTypeCd);
        this.orderDTO.customerID = GlobalConstants.customerInfo.id;
      }
      else {
        this.initDefaultOrder();
      }
      this.availablePoint = GlobalConstants.customerInfo.availablePoint;
    } catch (e) {
      throw e;
    }
  }


  getLocalStorage(code: string) {
    try {
      return this.configSvc.getLocalStorage(code);
    } catch (e) {
      throw e;
    }
  }



  /*********************Customize Item Start*************************/
  onChangeTopping(item: OrderItemTopping, isChecked: boolean, isReplaced: boolean) {
    try {
      let toppingItem = GlobalMethods.jsonDeepCopy(item);
      toppingItem.id = 0;
      toppingItem.tag = 0;
      if (isChecked) {
        if (toppingItem.toppingCategoryCd) {
          if (isReplaced) {
            let replacedItem = this.selectedToppingList.find(f => f.isReplaced == true);
            if (replacedItem) {
              this.utilitySvc.deleteCollection(this.selectedToppingList, replacedItem);

              let exToppingList = this.toppingItems.filter(f => f.isReplaced == true);
              exToppingList.forEach(element => {
                element.isReplaced = false;
              });
            }
            item.isReplaced = true;
            toppingItem.isAdded = false;
            toppingItem.isRemoved = false;
            toppingItem.isReplaced = true;
            toppingItem.replacedItemCodeID = this.replacedItemID;
            toppingItem.replacedItemDescription = this.replacedItemDesc;
          }
          else {
            toppingItem.isAdded = true;
            toppingItem.isRemoved = false;
            toppingItem.isReplaced = false;
            toppingItem.replacedItemCodeID = null;
            toppingItem.replacedItemDescription = null;
          }
          this.selectedToppingList.entityPush(toppingItem);
        }
        else if (toppingItem.isReplaceable && isReplaced) {
          this.isReplaceableItemSelected = true;
          this.replacedItemID = GlobalMethods.jsonDeepCopy(toppingItem.toppingItemCodeID);
          this.replacedItemDesc = GlobalMethods.jsonDeepCopy(toppingItem.variationsName);
          let replacedItem = this.selectedToppingList.find(f => f.isReplaced == true);
          if (replacedItem) {
            replacedItem.replacedItemCodeID = GlobalMethods.jsonDeepCopy(this.replacedItemID);
            replacedItem.replacedItemDescription = GlobalMethods.jsonDeepCopy(this.replacedItemDesc);
          }
        }
        else if (toppingItem.isRemoval) {
          toppingItem.isAdded = false;
          toppingItem.isRemoved = true;
          toppingItem.isReplaced = false;
          toppingItem.replacedItemCodeID = null;
          toppingItem.replacedItemDescription = null;
          this.selectedToppingList.entityPush(toppingItem);
        }
      }
      else {
        if (toppingItem.toppingCategoryCd) {
          if (isReplaced) {
            let replacedItem = this.selectedToppingList.find(f => f.isReplaced == true);
            if (replacedItem) {
              this.utilitySvc.deleteCollection(this.selectedToppingList, replacedItem);
            }
          }
          else {
            this.removeToppingItem(toppingItem);
          }
        }
        else if (toppingItem.isRemoval && !isReplaced) {
          this.removeToppingItem(toppingItem);
        }
      }

      this.totalToppingPrice = 0;
      this.totalToppingOfferPrice = 0;
      this.selectedToppingList.forEach(element => {
        if (element.price > 0) this.totalToppingPrice += Number(element.price);
        if(element.offerUnitPrice > 0) this.totalToppingOfferPrice += Number(element.offerUnitPrice);
      });

    } catch (e) {
      throw e;
    }
  }

  private removeToppingItem(item: OrderItemTopping) {
    try {
      let exItem = this.selectedToppingList.find(f => f.toppingItemCodeID == item.toppingItemCodeID);
      this.utilitySvc.deleteCollection(this.selectedToppingList, exItem);
    } catch (e) {
      throw e;
    }
  }
  /*********************Customize Item End*************************/



  /*************************************** Delivery & Store Address Start *************************************** */

  prepareOrderDeliveryDetail(store: any, deliveryAddress: any) {
    try {
      this.orderDTO.orderDeliveryDetail.customerID = GlobalConstants.customerInfo.id;
      this.orderDTO.orderDeliveryDetail.contactNo = GlobalConstants.customerInfo.mobileNo;
      if (deliveryAddress) {
        this.orderDTO.orderDeliveryDetail.latitude = deliveryAddress.latitude;
        this.orderDTO.orderDeliveryDetail.longitude = deliveryAddress.longitude;
        this.orderDTO.orderDeliveryDetail.deliveryAddress = deliveryAddress.address;
      }


      this.orderDTO.orderDeliveryDetail.storeLatitude = store.latitude;
      this.orderDTO.orderDeliveryDetail.storeLongitude = store.longitude;
      this.orderDTO.orderDeliveryDetail.storeID = store.storeID;
      this.orderDTO.orderDeliveryDetail.storeContactNo = store.mobile;
      this.orderDTO.orderDeliveryDetail.storeAddress = store.shortAddress;
      this.orderDTO.orderDeliveryDetail.storeName = store.storeName;
      this.orderDTO.storeShortName = store.storeCode;

      this.orderDTO.storeID = store.storeID;
      this.orderDTO.customerID = GlobalConstants.customerInfo.id;
      this.orderDTO.orderDeliveryDetail.displayPreOrderDate = formatDate(this.orderDTO.orderDeliveryDetail.preorderDate, FixedIDs.fixedIDs.format.dateFormat, "en");

    } catch (e) {
      throw e;
    }
  }

  private getDistance(lat1: number, lat2: number, lon1: number, lon2: number) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 6371
    // for miles. Use 3956
    let r = 6371;

    // calculate the result
    return (c * r);
  }

  getNearestStore(lat: number, lon: number) {
    try {
      let distanceList = [], distance = 0, isOutOfRange = false;
      this.storeAddress.forEach(element => {
        distance = this.getDistance(lat, parseFloat(element.latitude || 0), lon, parseFloat(element.longitude || 0)); //get distance in KM
        if (distance <= element.supportDistance) {
          isOutOfRange = false;
        }
        else {
          isOutOfRange = true;
        }
        distanceList.push({
          store: element,
          distance: distance,
          isOutOfRange: isOutOfRange
        });
      });

      distanceList.sort((a, b) => a.distance - b.distance);

      let rangeStore = distanceList.filter(x => x.isOutOfRange == false)[0];

      if (rangeStore) {
        return rangeStore;
      }
      else {
        return distanceList[0];
      }
    } catch (e) {
      throw (e);
    }
  }

  setStoreMinMaxTime(openingTime: any, closingTime: any, duration: number) {
    try {
      let currentDate = new Date(GlobalConstants.serverDate);
      let currentDateParse = Date.parse(new Date(GlobalConstants.serverDate).toString());

      let storeOpeningTime = GlobalMethods.mergeDateAndTime(new Date(GlobalConstants.serverDate), openingTime);
      let storeClosingTime = GlobalMethods.mergeDateAndTime(new Date(GlobalConstants.serverDate), closingTime);


      let storeOpnTimeParse = Date.parse(storeOpeningTime.toString());
      let strClsTimeParse = Date.parse(storeClosingTime.toString());

      let selectedDate = new Date(this.orderDTO.orderDeliveryDetail.preorderDate || GlobalConstants.serverDate);

      let d1Date = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate();
      let d2Date = selectedDate.getFullYear() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getDate();

      let d1 = Date.parse(d1Date);
      let d2 = Date.parse(d2Date);


      let currDateWithDuration = new Date(GlobalConstants.serverDate);
      currDateWithDuration.setMinutes(currDateWithDuration.getMinutes() + duration);
      let currDateWithDurationParse = Date.parse(currDateWithDuration.toString());

      if (currDateWithDurationParse > strClsTimeParse && d1 == d2) {
        this.orderDTO.orderDeliveryDetail.isPreorder = true;
        let addedDate = new Date(GlobalConstants.serverDate);
        addedDate.setDate(addedDate.getDate() + 1);
        this.orderDTO.orderDeliveryDetail.preorderDate = addedDate;
        storeOpeningTime.setMinutes(storeOpeningTime.getMinutes() + duration);
      }
      else {
        if (currentDateParse > storeOpnTimeParse && d1 == d2) {
          currentDate.setMinutes(currentDate.getMinutes() + duration);
          storeOpeningTime = currentDate;
        }
        else {
          storeOpeningTime.setMinutes(storeOpeningTime.getMinutes() + duration);
        }
      }

      this.strMinTime = storeOpeningTime;
      this.strMaxTime = storeClosingTime;
      this.orderDTO.orderDeliveryDetail.preorderTime = formatDate(storeOpeningTime, FixedIDs.fixedIDs.format.timeFormat, "en");
    } catch (e) {
      throw e;
    }
  }


  setStrScheduleTime() {
    try {
      if (this.orderDTO.orderDeliveryDetail.storeID > 0) {
        let minDeliveryDuration = 0;
        if (this.orderTypeCd == FixedIDs.orderType.Delivery) {
          minDeliveryDuration = Number(this.deliveryTimeSetList.filter(a => a.value == this.pageConfigType.MNDD)[0].pageConfigValue || 0);
        }
        else if (this.orderTypeCd == FixedIDs.orderType.Takeaway) {
          minDeliveryDuration = Number(this.deliveryTimeSetList.filter(a => a.value == this.pageConfigType.MNTD)[0].pageConfigValue || 0);
        }
        else if (this.orderTypeCd == FixedIDs.orderType['Dine-In']) {
          minDeliveryDuration = Number(this.deliveryTimeSetList.filter(a => a.value == this.pageConfigType.DIMNFSD)[0].pageConfigValue || 0);
        }
        this.setStoreMinMaxTime(this.strOpeningTime, this.strClosingTime, minDeliveryDuration);
      }
    } catch (e) {
      throw e;
    }
  }

  setStoreAddress() {
    try {
      let nearestStore = this.getNearestStore(parseFloat(this.selectedAddress.latitude), parseFloat(this.selectedAddress.longitude));
      let store = nearestStore.store;
      this.strOpeningTime = store.openingTime;
      this.strClosingTime = store.closingTime;
      this.prepareOrderDeliveryDetail(store, this.selectedAddress);
      //this.setStrScheduleTime();
    } catch (e) {
      throw e;
    }
  }
  /*************************************** Delivery & Store Address End ****************************************/


  /*************************************** Payment Start*************************************** */
  preparePaymentProcess(data: any) {
    try {
      let list = [];
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {

          const element = data[index];
          let entity = list.find(
            (x) => x.paymentMethodCd == element.paymentMethodCd && x.paymentProcessID == element.paymentProcessID
          );

          if (entity) {
            entity.paymentProcessItemList.push(element);
          }
          else {
            if (element.paymentMethodCd == FixedIDs.paymentMethod.CSH.code) element.isSelected = true;
            element.paymentProcessItemList = [];
            element.paymentProcessItemList.push(GlobalMethods.jsonDeepCopy(element));
            list.push(element);
          }

          //prepare payment proccess
          let exPaymentProcess = this.paymentProcessList.find(x => x.paymentProcessID == element.paymentProcessID);
          if (!exPaymentProcess) {
            this.paymentProcessList.push({
              paymentProcessID: element.paymentProcessID,
              paymentProcessName: element.paymentProcessName,
              processItemList: []
            });
          }
        }
      }
      return list;
    } catch (e) {
      throw (e);
    }
  }

  preparePaymentProcessByStoreID(storeID:number){
    try {
      this.paymentProcessList.forEach(element => {
        if (this.orderDTO.orderDeliveryDetail.storeID > 0) {
          element.processItemList = this.tempPaymentProcessItemList.filter(f => f.paymentProcessID == element.paymentProcessID && (f.paymentMethodCd == FixedIDs.paymentMethod.CSH.code || f.storeID == storeID));
          element.processItemList.forEach(processItem => {
            processItem.paymentProcessItemList = processItem.paymentProcessItemList.filter(f => f.paymentMethodCd == FixedIDs.paymentMethod.CSH.code || f.storeID == storeID);
          });
        }
      });
    } catch (e) {
      throw e; 
    }
  }

  resetPaymentProcessList(){
    try {
      this.paymentProcessList.forEach(paymentMethod => {
        paymentMethod.processItemList.forEach(element => {
            element.paymentProcessItemList.forEach(item => {
              if (item.paymentMethodCd == FixedIDs.paymentMethod.CSH.code)
              {
                element.isSelected = true;
              }else{
                item.isSelected = false;
              }
            });
        });
      });
    } catch (e) {
      throw e;
    }
  }

  prepareOrderPaymentOnCOD(paymethodList: any) {
    try {
      let list = [];
      if (this.selectedMethodValue) {
        let selectedPayMethod = paymethodList.find(f => f.paymentProcessID == this.selectedMethodValue);
        if (selectedPayMethod) {
          let selectedProcessList = [];
          selectedPayMethod.processItemList.forEach(element => {
            element.paymentProcessItemList.forEach(payProcess => {
              if (payProcess.isSelected) selectedProcessList.push(payProcess);
            });
          });

          if (selectedProcessList.length > 0) {
            for (let index = 0; index < selectedProcessList.length; index++) {
              const element = selectedProcessList[index];

              let entity: OrderPayment = list.filter(
                (x) => x.id > 0 && x.id == element.orderPaymentID
              )[0];
              if (entity) {
                let itm = new PaymentDetail(element);
                itm.id = 0;
                itm.orderPaymentID = 0;
                itm.transactionID = null;
                if (itm.paymentGatewayServiceID && itm.paymentGatewayServiceID > 0) {
                  entity.paymentDetailList.entityPush(itm);
                }
                else if (entity.paymentMethodCd == FixedIDs.paymentMethod.CSH.code) {
                  entity.paymentDetailList = [];
                  entity.paymentDetailList.entityPush(itm);
                }

                entity.amount = entity.paymentDetailList.map(a => a.amount).reduce(function (a, b) {
                  if (!a) a = 0;
                  if (!b) b = 0;
                  return (Number(a) + Number(b));
                });
                entity.id = 0;
                entity.setInsertTag();
              }
              else {
                let orderPayment = new OrderPayment(element);
                let itm = new PaymentDetail(element);
                itm.id = 0;
                itm.orderPaymentID = 0;
                itm.transactionID = null;
                if (itm.paymentGatewayServiceID && itm.paymentGatewayServiceID > 0) {
                  orderPayment.paymentDetailList.entityPush(itm);
                } else if (orderPayment.paymentMethodCd == FixedIDs.paymentMethod.CSH.code) {
                  orderPayment.paymentDetailList = [];
                  orderPayment.paymentDetailList.entityPush(itm);
                }
                orderPayment.id = 0;
                orderPayment.paymentTypeCd = element.paymentTypeCd;
                orderPayment.paymentMethodCd = element.paymentMethodCd;
                orderPayment.paymentTypeValue = element.service || element.paymentMethodDescription;
                orderPayment.service = element.service;
                orderPayment.isPaid = false;
                orderPayment.amount = orderPayment.paymentDetailList.map(a => a.amount).reduce(function (a, b) {
                  if (!a) a = 0;
                  if (!b) b = 0;
                  return (Number(a) + Number(b));
                });
                list.entityPush(orderPayment);
              }
            }
          }
        }
      }
      return list;
    }
    catch (e) {
      throw (e);
    }
  }

  prepareBeforeSave() {
    try {
      this.orderDTO.orderTrackingPageUrl = window.location.origin + '/order-track/';
      const codeGenPropertyVal = GlobalMethods.codeGenProperty();
      codeGenPropertyVal.orgShortName = this.orderDTO.storeShortName;
      this.orderDTO.codeGenPropertyVal = JSON.stringify(codeGenPropertyVal).toString();
      this.orderDTO.orderPaymentList = this.prepareOrderPaymentOnCOD(this.paymentProcessList);
      this.prepareInvoicePaymentDetail();
      this.prepareInvoiceMemberBenefit();

      this.orderDTO.isDutyIncluded = this.isDutyInclude;
      this.orderDTO.isPaid = FixedIDs.paymentStatus['Due(COD)'];
      this.orderDTO.paymentStatus = "Cash On Delivery";
      this.orderDTO.orderItemList.forEach(element => {
        element.customerID = this.orderDTO.customerID;
        if (element.itemDetail == '') element.itemDetail = null;
      });

      if(this.enableRewordPoint)
      {
        this.prepareEarnedPoint(this.orderDTO);
      }
    } catch (e) {
      throw e;
    }
  }
  prepareInvoicePaymentDetail() {
    try {
        this.orderDTO.invoicePaymentDetail.invoiceID = this.orderDTO.invoiceID || 0;
        this.orderDTO.invoicePaymentDetail.totalDuties = this.orderDTO.totalDuties || 0;
        this.orderDTO.invoicePaymentDetail.deliveryCharge = this.orderDTO.deliveryCharge || 0;
        this.orderDTO.invoicePaymentDetail.totalDiscount = this.orderDTO.totalDiscount || 0;
        this.orderDTO.invoicePaymentDetail.subTotal = this.orderDTO.subTotal || 0;
        this.orderDTO.invoicePaymentDetail.totalAmount = this.orderDTO.totalAmount || 0;
        this.orderDTO.invoicePaymentDetail.roundAmount = this.orderDTO.roundAmount || 0;
        this.orderDTO.invoicePaymentDetail.instantDiscount = this.orderDTO.instantDiscount || 0;
        this.orderDTO.invoicePaymentDetail.membershipDiscount = this.orderDTO.membershipDiscount || 0;
        this.orderDTO.invoicePaymentDetail.serviceCharge = this.orderDTO.serviceCharge || 0;
        this.orderDTO.invoicePaymentDetail.serviceChargeDuty = this.orderDTO.serviceChargeDuty || 0;
    } catch (e) {
      throw e;
    }
  }

  prepareInvoiceMemberBenefit() {
    try {
      if(this.orderDTO.invoicePaymentDetail.membershipDiscount > 0)
        {
          if(this.orderDTO.invoiceMemberBenefitList.length == 0)
          {
            let benefitObj = this.membershipBenefitList.find(f => f.benefitCd == FixedIDs.membershipBenefit.RegDiscPercent.code);

            let invMemberBenefit = new InvoiceMemberBenefit();
            invMemberBenefit.MembershipBenefitID = benefitObj.id;
            invMemberBenefit.discountAmount = this.orderDTO.invoicePaymentDetail.membershipDiscount;
            invMemberBenefit.memberDiscountPercent = benefitObj.memberDiscountPercent;
            this.orderDTO.invoiceMemberBenefitList.entityPush(invMemberBenefit);
          }
          else{
            let invMemberBenefit = this.orderDTO.invoiceMemberBenefitList[0];
            invMemberBenefit.discountAmount = this.orderDTO.invoicePaymentDetail.membershipDiscount;
            invMemberBenefit.setModifyTag();
          }
        }
    } catch (e) {
      throw e;
    }
  }


  prepareEarnedPoint(order:Order){
    try {
      order.earnedPoint = order.totalAmount *  (1 / Number(this.toEarnPoints));
      if(!this.enableFractionalPointCount) 
      {
        order.earnedPoint = Math.floor(order.earnedPoint);
      }
    } catch (e) {
      throw e;
    }
  }

  prepareAfterSave(res: any) {
    try {
      this.orderDTO.id = res.body.id;
      this.orderDTO.orderTrackLink = res.body.orderTrackLink;
      this.orderDTO.uniqueOrderNo = res.body.uniqueOrderNo;
      this.tempOrderDTO = GlobalMethods.jsonDeepCopy(this.orderDTO);
      this.setLocalStorage('tempOrderDTO', this.tempOrderDTO);
      this.resetModel();
    } catch (e) {
      throw e;
    }
  }


  prepareTrackList(data: any) {
    try {
      let list = [];
      let orderTypeCd = data[0].orderTypeCd;
      this.orderStatusList.forEach(element => {
        let orderTrack = new OrderTrack();
        orderTrack.statusCd = element.value;
        let entity = data.filter(x => x.statusCd == orderTrack.statusCd)[0];
        if (entity) {
          orderTrack.isCompleted = true;
          orderTrack.actionDateTime = formatDate(entity.actionDateTime, FixedIDs.fixedIDs.format.shortMonthDateTimeFormat, "en");
          orderTrack.isActive = true;
        }
        if (element.value == FixedIDs.orderStatus.Placed) {
          orderTrack.status = this.defaultSvc.getMessage('2096').engMessage;
          orderTrack.imgSrc = "../../assets/images/status/1.png";
        }
        else if (element.value == FixedIDs.orderStatus.Confirmed) {
          orderTrack.status = this.defaultSvc.getMessage('2097').engMessage;
          orderTrack.imgSrc = "../../assets/images/status/2.png";
        }
        else if (element.value == FixedIDs.orderStatus.Prepared) {
          if (orderTypeCd == FixedIDs.orderType.Delivery) {
            orderTrack.status = this.defaultSvc.getMessage('2098').engMessage;
          }
          else if (orderTypeCd == FixedIDs.orderType.Takeaway) {
            orderTrack.status = this.defaultSvc.getMessage('2099').engMessage;
          }
          else if (orderTypeCd == FixedIDs.orderType['Dine-In']) {
            orderTrack.status = this.defaultSvc.getMessage('2100').engMessage;
          }
          orderTrack.imgSrc = "../../assets/images/status/3.png";
        }
        else if (element.value == FixedIDs.orderStatus.Dispatched && orderTypeCd == FixedIDs.orderType.Delivery) {
          orderTrack.status = this.defaultSvc.getMessage('2101').engMessage;
          orderTrack.imgSrc = "../../assets/images/status/4.png";
        }
        else if (element.value == FixedIDs.orderStatus.Delivered) {
          if (orderTypeCd == FixedIDs.orderType.Delivery) {
            orderTrack.status = this.defaultSvc.getMessage('2102').engMessage;
          }
          else if (orderTypeCd == FixedIDs.orderType.Takeaway) {
            orderTrack.status = this.defaultSvc.getMessage('2103').engMessage;
          }
          orderTrack.imgSrc = "../../assets/images/status/5.png";
        }
        else if (element.value == FixedIDs.orderStatus.Served && orderTypeCd == FixedIDs.orderType['Dine-In']) {
          orderTrack.status = this.defaultSvc.getMessage('2104').engMessage;
          orderTrack.imgSrc = "../../assets/images/status/5.png";
        }
        if (orderTrack.status != null) {
          list.push(orderTrack);
        }
      });
      return list;
    } catch (e) {
      throw e;
    }
  }

  copyTrackingLink(trackingLink: string) {
    try {
      document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (trackingLink));
        e.preventDefault();
        document.removeEventListener('copy', null);
      });
      document.execCommand('copy');
    } catch (e) {
      throw e;
    }
  }


  onScrollSetActiveClass() {
    try {
        let activeSection = null;
        
        for (let index = 0; index < this.sectionList.length; index++) {
            const element = this.sectionList[index];
            const rect = element.getBoundingClientRect();

            if (rect.top <= 125) {
                activeSection = element.getAttribute("id");
            }
        }
        if (activeSection) {
            let categoryID = parseInt(activeSection.split('_')[1]);
            if (categoryID != this.selectedCategoryID) {
                if(this.activeCategoryElementList.length > 0)
                {
                    this.activeCategoryElementList.forEach(activeCategoryElement => {
                        if(activeCategoryElement.parentNode['attributes']['aria-hidden'] == undefined)
                        {
                            activeCategoryElement.parentNode['classList'].forEach(element => {

                                if(this.isScrollTopToBottom)
                                {
                                    if (element == 'p-carousel-item-end') {
                                        let element: HTMLElement = document.getElementsByClassName('p-carousel-next')[0] as HTMLElement;
                                        element.click();
                                    }
                                }
                                else{
                                    if (element == 'p-carousel-item-start') {
                                        if(activeCategoryElement.attributes['id']?.nodeValue)
                                        {
                                            let nodeValue = activeCategoryElement.attributes['id']?.nodeValue;
                                            let currentActiveId = nodeValue.replace('categoryAnchor', '');

                                            if(currentActiveId != this.itemCategories[0].itemDisplayCategoryID)
                                            {
                                                let element: HTMLElement = document.getElementsByClassName('p-carousel-prev')[0] as HTMLElement;
                                                element.click();
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
                this.selectedCategoryID = GlobalMethods.jsonDeepCopy(categoryID);
            }
        }
    } catch (e) {
        throw e;
    }
  }

  onWindowScrollSetActiveCategory(){
    try {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      if(this.scrollPosition < pos )
      {
          this.isScrollTopToBottom = true;
      }
      else{
          this.isScrollTopToBottom = false;
      }
      this.scrollPosition = GlobalMethods.jsonDeepCopy(pos);
      
      if(this.isFirstScrolling || !this.isScrollToAnchorClick)
      {
        this.onScrollSetActiveClass();
      }
      // var scroll = window.scrollY;
      // const scrollNav = document.getElementById('food-scroll-nav');
      // if (scroll >= 260) {
      //     scrollNav.classList.add("adNav");
      //     this.isShowImage = false;
      // }
      // else {
      //     scrollNav.classList.remove("adNav");
      //     this.isShowImage = true;
      // }
    } catch (e) {
      throw e;
    }
  }


  onClickDetail(id:any, item:any){
    try {
      if(item.isShow)
      {
        item.isShow = false;
        clearTimeout(Number(this.dataCacheService.get(id)));
      }
      else{
        item.isShow = true;
        var itemDetailActivity = setTimeout(
          () => this.closeItemDetail(id, item),
          10000 // 10 Second
        );
        this.dataCacheService.set(id, itemDetailActivity);
      }
    } catch (e) {
      throw e;
    }
  }

  closeItemDetail(id:any, item:any){
    try {
      if(item.isShow)
      {
        document.getElementById(id).click();
      }
    } catch (e) {
      throw e;
    }
  }

  prepareMealItems(data:any){
    try {
      let list = [];
      data.forEach(element => {
        let item = new OrderItemComboDetail(element);
        if(item.isSpicy)
        {
          item.spiceCd = FixedIDs.spicyOption.NonSpicy.code;
          item.spiceOption = FixedIDs.spicyOption.NonSpicy.value;
        }
        if(item.qty > 1)
        {
          let qty = GlobalMethods.jsonDeepCopy(item.qty);

          item.qty = 1;
          item.vat = item.vat / qty;
          item.sD = item.sD / qty;
          for (let index = 0; index < qty; index++) {
            list.entityPush(GlobalMethods.jsonDeepCopy(item));
          }
        }
        else{
          list.entityPush(item);
        }
      });
      return list;
    } catch (e) {
      throw e;
    }
  }

  updatePriceOfComboItem(item: OrderItemComboDetail){
    try {
      item.priceDE = 0;
      item.priceDI = 0;
      item.vATPercent = 0;
      item.vat = 0;
      item.sDPercent = 0;
      item.sD = 0;
    } catch (e) {
      throw e;
    }
  }

  prepareMealTotalPrice(entity:any){
    try {
      entity.unitPrice = 0;
      entity.vat = 0;
      entity.sD = 0;
      entity.vATPrcnt = 0;
      entity.sDPrcnt = 0;

      let mealPriceDE = 0, mealPriceDI = 0;

      entity.orderItemComboDetailList.forEach(element => {
        entity.vat += element.vat;
        entity.sD += element.sD;
        mealPriceDE += element.priceDE;
        mealPriceDI += element.priceDI;
      });


      if(GlobalConstants.companyInfo.isDutyInclude)
      {
        entity.unitPrice =  mealPriceDI;
      }
      else{
        entity.unitPrice =  mealPriceDE;
      }

      entity.vATPrcnt = (100 * entity.vat / (mealPriceDE + entity.sD)) || 0;
      entity.sDPrcnt = (100 * entity.sD / mealPriceDE) || 0;
     
      if (entity.salesPriceList.length > 0)
      {
        let salesPrice = entity.salesPriceList[0];
        let orderItemDuty = salesPrice.orderItemDutyList[0];
  
  
        salesPrice.vat = entity.vat;
        salesPrice.vATPrcnt = entity.vATPrcnt;
        salesPrice.sD = entity.sD;
        salesPrice.sDPrcnt = entity.sDPrcnt;
        salesPrice.duties = salesPrice.vat + salesPrice.sD;
        salesPrice.unitPrice = entity.unitPrice;
  
        orderItemDuty.vatPercent = entity.vATPrcnt;
        orderItemDuty.sDPercent = entity.sDPrcnt;
        orderItemDuty.unitVatValue = entity.vat;
        orderItemDuty.unitSDValue = entity.sD;
      }
    } catch (e) {
      throw e;
    }
  }

  prepareSwipeData(entity:any){
    try {
      this.selectedItem.unitPrice = entity.unitPrice;
      this.selectedItem.orderItemDutyList = entity.orderItemDutyList;
      this.selectedItem.salesPriceList = entity.salesPriceList;
      this.selectedItem.orderItemComboDetailList = entity.orderItemComboDetailList;
    } catch (e) {
      throw e;
    }
  }

  updateMealItem(exItem: OrderItemComboDetail, newItem:OrderItemComboDetail, isUpdate:boolean){
    try {
        exItem.variationsName = newItem.variationsName;
        exItem.itemDetailCodeItemID = newItem.itemDetailCodeItemID;
        exItem.itemCode = newItem.itemCode;
        exItem.imageID = newItem.imageID;
        exItem.imageFileName = newItem.imageFileName;
        exItem.spiceCd = newItem.spiceCd;
        exItem.coldCd = newItem.coldCd;
        exItem.priceDE = newItem.priceDE;
        exItem.priceDI = newItem.priceDI;
        exItem.vat = newItem.vat;
        exItem.vATPercent = newItem.vATPercent;
        exItem.sD = newItem.sD;
        exItem.sDPercent = newItem.sDPercent;
        if(isUpdate)
        {
          if(exItem.mealItemDetailID)
          {
            exItem.replacedMealItemDetailID = exItem.mealItemDetailID;
          }
          exItem.mealItemDetailID = null;
        }
        else{
          exItem.mealItemDetailID = newItem.mealItemDetailID;
        }
    } catch (e) {
      throw e;
    }
  }
  prepareItemComboDetail(entity:UniqueItemDTO){
    try {
      entity.orderItemComboDetailList = [];
      entity.orderItemComboDetailList = GlobalMethods.jsonDeepCopy(this.mealItemComDetailList.filter(a => a.mealID == entity.uniqueItemCodeID));
      entity.orderItemComboDetailList.forEach(item => {
        if(item.isRemovable || item.isSpicy || item.isUpdateable || item.isSwipable)
        {
          entity.isSwipable = true;
        }
      });
    } catch (e) {
      throw e;
    }
  }

  
  //--------------------------------Offer----------------------------//
  prepareOfferPrice(item:UniqueItemDTO, isSecondaryUnit: boolean)
  {
    try {
      if(!item.isNonDiscItem)
      {
        let totalOfferDisc = 0, offerUnitPrice = 0;
        this.itemUnitPrice = isSecondaryUnit == true ? item.secondaryUnitPrice : item.unitPrice;
        if(isSecondaryUnit)
        {
          item.secondaryOfferUnitPrice = 0;
        }
        else{
          item.offerUnitPrice = 0;
        }
        item.offerImageFilePath = null;
        totalOfferDisc = this.calculateFlatDiscount(null, item) + this.calculateItmWisePercentDisc(null, item) + this.calculateItmWiseFixedDisc(null, item) + this.calculateCatWisePercentDisc(null, item) + this.calculateCatWiseFixedDisc(null, item) + this.calculateBuyNGetSameItem(null, null, item); //+ this.calculateMemberShipDisc(null, item);
        if(totalOfferDisc > 0)
        {
          if(totalOfferDisc >= this.itemUnitPrice)
            {
              offerUnitPrice = this.itemUnitPrice;
            }
            else{
              offerUnitPrice = this.itemUnitPrice - totalOfferDisc;
            }

            if(isSecondaryUnit)
            {
              item.secondaryOfferUnitPrice = offerUnitPrice;
            }
            else{
              item.offerUnitPrice = offerUnitPrice;
            }
        }
      }
      
    } catch (e) {
      throw e;
    }
  }


  prepareOfferDiscount(order:Order){
    try {
      
      if(order.orderItemList.length > 0)
      {
        let totalOfferDisc = 0;
        order.orderItemList.forEach(item => {
          if(!item.isNonDiscItem)
          {
            this.itemUnitPrice = item.unitPrice + item.totalToppingPrice;
            item.offerUnitDiscount = 0;
            item.membershipUnitDiscount = 0;
            if(this.isDutyInclude == false)
            {
              this.itemUnitPrice = this.itemUnitPrice + (item.duties / item.qty);
            }

            item.orderItemOfferList = item.orderItemOfferList.filter(f => f.orderItemID > 0);
            totalOfferDisc = this.calculateFlatDiscount(item, null) + this.calculateItmWisePercentDisc(item) + this.calculateItmWiseFixedDisc(item) + this.calculateCatWisePercentDisc(item) + this.calculateCatWiseFixedDisc(item) + this.calculateBuyNGetSameItem(order,item) + this.calculateMemberShipDisc(item);
            if(totalOfferDisc > 0)
            {
              if(totalOfferDisc > this.itemUnitPrice) totalOfferDisc = this.itemUnitPrice;

              item.offerUnitDiscount = totalOfferDisc;

              if(item.membershipUnitDiscount > 0)
              {
                item.offerUnitDiscount = item.offerUnitDiscount - item.membershipUnitDiscount;
              }

              let offerDiscPercent = (100 *  totalOfferDisc) / this.itemUnitPrice;
              if(offerDiscPercent > 100) offerDiscPercent = 100;

              item.offerDiscountPercent = offerDiscPercent;
              this.calDiscInItem(item, item.offerDiscountPercent, Number(this.orderDTO.invoicePaymentDetail.instantDiscountPercent));
            }
            else if(item.offerPrice > 0){
              item.offerPrice = 0;
              item.offerDiscountPercent = 0;
              this.calDiscInItem(item, 0, Number(this.orderDTO.invoicePaymentDetail.instantDiscountPercent));
            }
          }
        });
      }
    } catch (e) {
      throw e;
    }
  }

  calculateFlatDiscount(item?:OrderItem, uniqueItem?: UniqueItemDTO){
    try {
      this.offerCd = FixedIDs.offer.PercentFlatDiscount.code;

      if(uniqueItem)
      {
        let discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
        if(this.orderDTO.storeID > 0)
        {
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
        }
        if(discObj)
        {
          if(!this.checkOfferBusiness(discObj)) return 0;
          if(discObj.offerImageFilePath) uniqueItem.offerImageFilePath = discObj.offerImageFilePath;
          return this.itemUnitPrice * (discObj.offerAmountPercent / 100);
        }
        else{
          return 0;
        }
      }

      let exDiscObj = item.orderItemOfferList.find(f => f.orderItemID > 0 && f.offerCd == this.offerCd);
      if(exDiscObj)
      {
        this.manageOfferItem(item, exDiscObj, false);
        return exDiscObj.unitOfferAmount; 
      }

      let discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderTypeCd == this.orderTypeCd && f.businessCd == this.orderDTO.orderCategoryCd && f.couponCode == null);
      if(!discObj && this.orderDTO.couponList.length > 0)
      {
        this.orderDTO.couponList.forEach(coupon => {
          discObj = this.offerDetailList.find(f =>f.offerID == coupon.offerID && f.offerCd == this.offerCd && f.couponCode == coupon.couponCode);
        });
      }
      
      if(discObj)
      {
        if(!this.checkOfferBusiness(discObj)) return 0;
        discObj.offerAmount = this.itemUnitPrice * (discObj.offerAmountPercent / 100);
        this.manageOfferItem(item, discObj, false);
        return discObj.offerAmount;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }

  calculateItmWisePercentDisc(item?:OrderItem, uniqueItem?: UniqueItemDTO){
    try {
      this.offerCd = FixedIDs.offer.ItmWisePercentDisc.code;

      if(uniqueItem)
      {
        let discObj = null
        if(uniqueItem.isDealItem)
        {
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == uniqueItem.itemID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
          if(this.orderDTO.storeID > 0)
          {
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == uniqueItem.itemID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
          }
        }
        else{
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == uniqueItem.itemID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
          if(this.orderDTO.storeID > 0)
          {
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == uniqueItem.itemID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
          }
        }
        if(discObj)
        {
          if(!this.checkOfferBusiness(discObj)) return 0;
          if(discObj.offerImageFilePath) uniqueItem.offerImageFilePath = discObj.offerImageFilePath;
          return this.itemUnitPrice * (discObj.offerAmountPercent / 100);
        }
        else{
          return 0;
        }
      }

      let exDiscObj = item.orderItemOfferList.find(f => f.orderItemID > 0 && f.offerCd == this.offerCd);
      if(exDiscObj)
      {
        this.manageOfferItem(item, exDiscObj, false);
        return exDiscObj.unitOfferAmount; 
      }

      let discObj = null;
      if(item.isDeal)
      {
        discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == item.mealID && f.orderTypeCd == this.orderTypeCd  && f.couponCode == null);
      }
      else{
        discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == item.itemID && f.orderTypeCd == this.orderTypeCd && f.couponCode == null);
      }
      
      if(!discObj && this.orderDTO.couponList.length > 0)
      {
        this.orderDTO.couponList.forEach(coupon => {
          discObj = this.offerDetailList.find(f =>f.offerID == coupon.offerID && f.offerCd == this.offerCd && f.couponCode == coupon.couponCode);
        });
      }
      if(discObj)
      {
        if(!this.checkOfferBusiness(discObj)) return 0;
        discObj.offerAmount = this.itemUnitPrice * (discObj.offerAmountPercent / 100);
        this.manageOfferItem(item, discObj, false);
        return discObj.offerAmount;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }

  calculateItmWiseFixedDisc(item?:OrderItem, uniqueItem?: UniqueItemDTO){
    try {
      this.offerCd = FixedIDs.offer.ItmWiseFixedAmntDisc.code;

      if(uniqueItem)
      {
        let discObj = null;
        if(uniqueItem.isDealItem)
        {
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == uniqueItem.itemID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
          if(this.orderDTO.storeID > 0)
          {
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == uniqueItem.itemID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
          }
        }
        else{
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == uniqueItem.itemID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
          if(this.orderDTO.storeID > 0)
          {
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == uniqueItem.itemID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
          }
        }
       
        if(discObj)
        {
          if(!this.checkOfferBusiness(discObj)) return 0;
          if(discObj.offerImageFilePath) uniqueItem.offerImageFilePath = discObj.offerImageFilePath;
          return discObj.offerAmount;
        }
        else{
          return 0;
        }
      }

      let exDiscObj = item.orderItemOfferList.find(f => f.orderItemID > 0 && f.offerCd == this.offerCd);
      if(exDiscObj)
      {
        this.manageOfferItem(item, exDiscObj, false);
        return exDiscObj.unitOfferAmount; 
      }

      let discObj = null;
      if(item.isDeal)
      {
        discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == item.mealID && f.orderTypeCd == this.orderTypeCd && f.couponCode == null);
      }
      else{
        discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == item.itemID && f.orderTypeCd == this.orderTypeCd && f.couponCode == null);
      }
      if(!discObj && this.orderDTO.couponList.length > 0)
      {
        this.orderDTO.couponList.forEach(coupon => {
          discObj = this.offerDetailList.find(f =>f.offerID == coupon.offerID && f.offerCd == this.offerCd && f.couponCode == coupon.couponCode);
        });
      }
      if(discObj)
      {
        if(!this.checkOfferBusiness(discObj)) return 0;
        this.manageOfferItem(item, discObj, false);
        return discObj.offerAmount;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }

  calculateCatWisePercentDisc(item?:OrderItem, uniqueItem?: UniqueItemDTO){
    try {
      this.offerCd = FixedIDs.offer.CatWisePercentDisc.code;

      if(uniqueItem)
      {
        let discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.displayCategoryID == uniqueItem.itemDisplayCategoryID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
        if(this.orderDTO.storeID > 0)
        {
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.displayCategoryID == uniqueItem.itemDisplayCategoryID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
        }
        if(discObj)
        {
          if(!this.checkOfferBusiness(discObj)) return 0;
          if(discObj.offerImageFilePath) uniqueItem.offerImageFilePath = discObj.offerImageFilePath;
          return this.itemUnitPrice * (discObj.offerAmountPercent / 100);
        }
        else{
          return 0;
        }
      }

      let exDiscObj = item.orderItemOfferList.find(f => f.orderItemID > 0 && f.offerCd == this.offerCd);
      if(exDiscObj)
      {
        this.manageOfferItem(item, exDiscObj, false);
        return exDiscObj.unitOfferAmount; 
      }

      let discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.displayCategoryID == item.itemDisplayCategoryID && f.orderTypeCd == this.orderTypeCd && f.businessCd == this.orderDTO.orderCategoryCd && f.couponCode == null);
      if(!discObj && this.orderDTO.couponList.length > 0)
      {
        this.orderDTO.couponList.forEach(coupon => {
          discObj = this.offerDetailList.find(f =>f.offerID == coupon.offerID && f.offerCd == this.offerCd && f.couponCode == coupon.couponCode);
        });
      }
      if(discObj)
      {
        if(!this.checkOfferBusiness(discObj)) return 0;
        discObj.offerAmount = this.itemUnitPrice * (discObj.offerAmountPercent / 100);
        this.manageOfferItem(item, discObj, false);
        return discObj.offerAmount;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }

  calculateCatWiseFixedDisc(item?:OrderItem, uniqueItem?: UniqueItemDTO){
    try {
      this.offerCd = FixedIDs.offer.CatWiseFixedDisc.code;
      if(uniqueItem)
      {
        let discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.displayCategoryID == uniqueItem.itemDisplayCategoryID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
        if(this.orderDTO.storeID > 0)
        {
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.displayCategoryID == uniqueItem.itemDisplayCategoryID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
        }
        if(discObj)
        {
          if(!this.checkOfferBusiness(discObj)) return 0;
          if(discObj.offerImageFilePath) uniqueItem.offerImageFilePath = discObj.offerImageFilePath;
          return discObj.offerAmount;
        }
        else{
          return 0;
        }
      }

      let exDiscObj = item.orderItemOfferList.find(f => f.orderItemID > 0 && f.offerCd == this.offerCd );
      if(exDiscObj)
      {
        this.manageOfferItem(item, exDiscObj, false);
        return exDiscObj.unitOfferAmount; 
      }

      let discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd  && f.displayCategoryID == item.itemDisplayCategoryID && f.orderTypeCd == this.orderTypeCd && f.businessCd == this.orderDTO.orderCategoryCd && f.couponCode == null);
      if(!discObj && this.orderDTO.couponList.length > 0)
      {
        this.orderDTO.couponList.forEach(coupon => {
          discObj = this.offerDetailList.find(f =>f.offerID == coupon.offerID && f.offerCd == this.offerCd && f.couponCode == coupon.couponCode);
        });
      }
      if(discObj)
      {
        if(!this.checkOfferBusiness(discObj)) return 0;
        this.manageOfferItem(item, discObj, false);
        return discObj.offerAmount;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }

  calculateBuyNGetSameItem(order?:Order, item?:OrderItem, uniqueItem?: UniqueItemDTO){
    try {
      this.offerCd = FixedIDs.offer.BuyNGetSameItemFree.code;

      if(uniqueItem)
      {
        let discObj = null;
        if(uniqueItem.isDealItem)
        {
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == uniqueItem.itemID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
          if(this.orderDTO.storeID > 0)
          {
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == uniqueItem.itemID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
          }
        }
        else {
          discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == uniqueItem.itemID && f.orderTypeCd == FixedIDs.orderType.Delivery && f.isGlobal && f.couponCode == null);
          if(this.orderDTO.storeID > 0)
          {
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == uniqueItem.itemID && f.orderTypeCd == this.orderTypeCd && f.storeID == this.orderDTO.storeID && f.couponCode == null);
          }
        }
        
        if(discObj)
        {
          if(!this.checkOfferBusiness(discObj)) return 0;
          if(discObj.offerImageFilePath) uniqueItem.offerImageFilePath = discObj.offerImageFilePath;
        }
        return 0;
      }

      let discObj = item.orderItemOfferList.find(f => f.orderItemID > 0 && f.offerCd == this.offerCd);
      if(!discObj)
      {
        if(item.isDeal)
          {
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedMealID == item.mealID && f.orderTypeCd == this.orderTypeCd && f.couponCode == null);
          }
          else{
            discObj = this.offerDetailList.find(f => f.offerCd == this.offerCd && f.orderedItemID == item.itemID && f.orderTypeCd == this.orderTypeCd && f.couponCode == null);
          }
         if(!discObj && this.orderDTO.couponList.length > 0)
          {
            this.orderDTO.couponList.forEach(coupon => {
              if(item.isDeal)
                {
                  discObj = this.offerDetailList.find(f => f.offerID == coupon.offerID && f.offerCd == this.offerCd && f.orderedMealID == item.mealID && f.couponCode == coupon.couponCode);
                }
                else{
                  discObj = this.offerDetailList.find(f => f.offerID == coupon.offerID && f.offerCd == this.offerCd && f.orderedItemID == item.itemID && f.couponCode == coupon.couponCode);
                }
            });
          }
          if(discObj)
          {
            if(!this.checkOfferBusiness(discObj)) return 0;
          }
      }
      if(discObj)
      {
        let totalOrderQty = 0;
        let totalOfferQty = 0;
        let exOrdQty = 0;

        if(this.orderDTO.id == 0)
        {
          this.orderDTOList.forEach(order => {
            if(order.id != this.orderDTO.id)
              {
                order.orderItemList.forEach(ordItem => {
                  if(ordItem.uniqueItemCodeID == item.uniqueItemCodeID)
                    {
                      totalOrderQty += Number(ordItem.qty);
                    }
  
                    let exOfferItem = ordItem.offerItemList.find(f => f.uniqueItemCodeID == item.uniqueItemCodeID);
                    if(exOfferItem)
                      {
                        totalOfferQty += Number(exOfferItem.qty) * discObj.orderdQty;
                      }
                  });
              }
          });
        }
        exOrdQty = totalOrderQty - totalOfferQty;
        totalOrderQty = 0;
        totalOfferQty = 0;

        this.orderDTO.orderItemList.forEach(ordItem => {

          if(item.isDeal)
          {
            if(ordItem.mealID == item.mealID)
              {
                totalOrderQty += Number(ordItem.qty);

                let exOfferItem = ordItem.offerItemList.find(f => f.mealID == item.mealID);
                if(exOfferItem)
                {
                  totalOfferQty += Number(exOfferItem.qty) * discObj.orderdQty;
                }
              }
          }
          else{
            if(ordItem.uniqueItemCodeID == item.uniqueItemCodeID)
              {
                totalOrderQty += Number(ordItem.qty);

                let exOfferItem = ordItem.offerItemList.find(f => f.uniqueItemCodeID == item.uniqueItemCodeID);
                if(exOfferItem)
                {
                  totalOfferQty += Number(exOfferItem.qty) * discObj.orderdQty;
                }
              }
          }
        });
        totalOrderQty += exOrdQty;
        let exOfferItem = null;
        if(item.isDeal)
        {
          exOfferItem = item.offerItemList.find(f => f.mealID == item.mealID);
        }
        else{
          exOfferItem = item.offerItemList.find(f => f.uniqueItemCodeID == item.uniqueItemCodeID);
        }
        if(totalOrderQty >= discObj.orderdQty)
        {
          totalOfferQty = Math.floor(totalOrderQty / discObj.orderdQty) * discObj.offerQty;
          if(totalOfferQty > 0)
            {
              if(exOfferItem)
                {
                  exOfferItem.isCancelled = false;
                  exOfferItem.qty = totalOfferQty;
                  exOfferItem.setModifyTag();
                }
                else{
                  let offerItem = new OrderItem();
                  offerItem.customerID = item.customerID;
                  offerItem.thirdPartyID = item.thirdPartyID;
                  offerItem.uniqueItemCodeID = item.uniqueItemCodeID;
                  offerItem.mealID = item.mealID;
                  offerItem.uOMID = item.uOMID;
                  offerItem.qty = totalOfferQty;
                  offerItem.orderItemComboDetailList = item.orderItemComboDetailList;
                  offerItem.orderItemComboDetailList.forEach(offerComboItem => {
                    offerComboItem.id = 0;
                    offerComboItem.setInsertTag();
                  });
                  offerItem.variationsName = item.variationsName;
                  item.offerItemList.entityPush(offerItem);
                }
              discObj.offerAmount = 0;
              this.manageOfferItem(item, discObj, false);
              return 0;
            }
        }
        if(exOfferItem)
        {
          if(!exOfferItem.isAdded())
            {
              exOfferItem.qty = 0;
              exOfferItem.isCancelled = true;
              exOfferItem.setModifyTag();
            }
            this.manageOfferItem(item, discObj, true);
        }
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }

  calculateMemberShipDisc(item?:OrderItem, uniqueItem?: UniqueItemDTO){
    try {
      if(this.orderDTO.invoiceMemberBenefitList.length > 0)
      {
        let discObj = this.orderDTO.invoiceMemberBenefitList[0];
        item.membershipUnitDiscount = this.itemUnitPrice * (discObj.memberDiscountPercent / 100);
        item.memberDiscountPercent = discObj.memberDiscountPercent;
        return item.membershipUnitDiscount;
      }
      let discObj = this.membershipBenefitList.find(f => f.benefitCd == FixedIDs.membershipBenefit.RegDiscPercent.code);
      if(discObj)
      {
        item.membershipUnitDiscount = this.itemUnitPrice * (discObj.memberDiscountPercent / 100);
        item.memberDiscountPercent = discObj.memberDiscountPercent;
        return item.membershipUnitDiscount;
      }
      else{
        item.membershipUnitDiscount = 0;
        item.memberDiscountPercent = 0;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }


  checkOfferBusiness(discObj:any){
    try {
      if(discObj.isAppliedForFirstOrder)
      {
        if(!GlobalConstants.customerInfo.id)
        {
          return false;
        }
        if(GlobalConstants.customerInfo.totalOrd > 0)
        {
          return false;
        }
      }

      // if(discObj.isNeedToIdentify && !this.orderDTO.isIdentityVerified)
      // {
      //   if(this.orderDTO.isNeedToIdentify == false) this.orderDTO.isNeedToIdentify = true;
      //   return false;
      // }

      if(discObj.startTime)
      {
        if(!this.checkStartAndExpireTime(discObj))
        {
          return false;
        }
      }
      return true;
    } catch (e) {
      throw e;
    }
  }

  checkStartAndExpireTime(discObj:any){
    try {
      this.serverDate = GlobalConstants.serverDate;
      let currDateParse = Date.parse(this.serverDate.toString());
      if(discObj.startTime)
      {
        let startDateTime = GlobalMethods.mergeDateAndTime(new Date(discObj.startDate), discObj.startTime);
        
        let startDateParse = Date.parse(startDateTime.toString());
        
        if(currDateParse  <  startDateParse)
        {
          return false;
        }
      }

      if(discObj.expireTime)
      {
        let expireDateTime = GlobalMethods.mergeDateAndTime(new Date(discObj.expireDate), discObj.expireTime);
        let expireDateParse = Date.parse(expireDateTime.toString());
        
        if(currDateParse  >  expireDateParse)
        {
          return false;
        }
      }
      return true;
    } catch (e) {
      throw e;
    }
  }

  manageOfferItem(item:OrderItem, offer:any, isDelete:boolean){
    try {
      let xOfferItem = item.orderItemOfferList.find(f => f.offerID == offer.offerID);
      if(xOfferItem)
      {
        if(xOfferItem.orderItemID > 0)
          {
            if(isDelete)
              {
                xOfferItem.setDeleteTag();
              }
              else{
                xOfferItem.offerAmount = xOfferItem.unitOfferAmount * item.qty; 
                xOfferItem.setModifyTag();
              }
          }
          else if(isDelete) {
            item.orderItemOfferList.entityPop(xOfferItem);
          }
      }
      else if(isDelete == false){
        let offerItem = new OrderItemOffer(offer);
        offerItem.id = 0;
        offerItem.unitOfferAmount = offer.offerAmount;
        offerItem.offerAmount = offer.offerAmount * item.qty;
        offerItem.offerDefinitionName = offer.offerDefinitionName;
        offerItem.termNCondiText = offer.termNCondiText;
        item.orderItemOfferList.entityPush(offerItem);
      }
    } catch (e) {
      throw e;
    }
  }
  prepareOfferIDByCouponCd(couponCode:string){
    try {
      couponCode = couponCode.trim();
      let couponObj = this.offerDetailList.find(f => f.orderTypeCd == this.orderTypeCd && f.businessCd == this.orderDTO.orderCategoryCd && f.couponCode == couponCode);
      if(couponObj)
      {
        return couponObj.offerID;
      }
       return null;
    } catch (e) {
      throw e;
    }
  }

  checkValidCuponNo(couponCode:string){
    try {
      let couponObj = this.offerDetailList.find(f => f.orderTypeCd == this.orderTypeCd && f.businessCd == this.orderDTO.orderCategoryCd && f.couponCode == couponCode);
      if(couponObj)
      {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  prepareCouponList(){
    try {
      this.orderDTO.couponList = [];
      this.orderDTO.orderItemList.forEach(ordItem => {
        ordItem.orderItemOfferList.forEach(ordItemOffer => {
          if(ordItemOffer.couponCode)
            {
              let exCoupon = this.orderDTO.couponList.find(f => f.couponCode == ordItemOffer.couponCode);
              if(!exCoupon) 
                {
                  let coupon = new CouponModel();
                  coupon.id = ordItemOffer.id;
                  coupon.offerID = ordItemOffer.offerID;
                  coupon.couponCode = ordItemOffer.couponCode;
                  this.orderDTO.couponList.push(coupon);
                }
            }
        });
      });
    } catch (e) {
      throw e;
    }
  }

  calDiscInItem(item:OrderItem, discPercent:number, instDiscPerc:number)
  {
    try {
      let unitPrice = Number(item.unitPrice) || 0, discount = 0, vatPercent = 0, sdPercent = 0, itemDuty = 0, discDuties = 0;
      if(item.totalToppingPrice > 0) unitPrice +=  item.totalToppingPrice;
      // discount = GlobalMethods.convertToDecimal(unitPrice * (discPercent / 100), 4);
      if(discPercent > 0)
      {
        discount = unitPrice * (discPercent / 100);
      }
      if(instDiscPerc > 0)
      {
        discount += (unitPrice - discount) * (instDiscPerc / 100);
      }

      if(discount > unitPrice) discount = unitPrice;


      item.discountPrice = item.qty * discount;
      item.unitDiscPrice = Number(discount);

      if (item.totalToppingPrice && item.totalToppingPrice > 0) item.totalPrice = item.qty * (Number(item.unitPrice) + Number(item.totalToppingPrice));
      else item.totalPrice = item.qty * Number(item.unitPrice);

      vatPercent = item.orderItemDutyList[0]?.vatPercent || 0;
      sdPercent = item.orderItemDutyList[0]?.sDPercent || 0;

      let discDutyValue = new DutyValue();
      discDutyValue.vatPercent = vatPercent || 0;
      discDutyValue.sDPercent = sdPercent || 0;
      discDutyValue.amount = item.discountPrice;
      discDutyValue = this.getDutiesValue(discDutyValue, this.dutyFormulaDetailList);

      let dutyValue = new DutyValue();
      dutyValue.vatPercent = vatPercent || 0;
      dutyValue.sDPercent = sdPercent || 0;
      dutyValue.amount = item.totalPrice;
      dutyValue = this.getDutiesValue(dutyValue, this.dutyFormulaDetailList);

      item.orderItemDutyList?.forEach(duty => {
        if(GlobalConstants.companyInfo.isVatApplicable)
        {
          duty.vatValue = dutyValue.vatValue;
          duty.vatDiscount = discDutyValue.vatValue;
          itemDuty = itemDuty + duty.vatValue;
          discDuties = discDuties + duty.vatDiscount;
        }

        if(GlobalConstants.companyInfo.isSDApplicable)
        {
          duty.sDValue = dutyValue.sDValue;
          duty.sDDiscount = discDutyValue.sDValue;
          itemDuty = itemDuty + duty.sDValue;
          discDuties = discDuties + duty.sDDiscount;
        }
        if (duty.id == 0) duty.setInsertTag();
        if (duty.id > 0) duty.setModifyTag();
        if (item.tag == FixedIDs.objectState.deleted) duty.setDeleteTag();
      });
      item.duties = itemDuty;
      item.discountDuties = discDuties;

      if (item.id > 0) item.setModifyTag();
      else item.setInsertTag();
    } catch (e) {
      throw e;
    }
  }
  
  getDutiesValue(dutyValue:DutyValue, dutyFormulaDetailList:any){
    try {
      if (GlobalConstants.companyInfo.isDutyInclude) {
        if (dutyFormulaDetailList.length > 0) {

          for (let index = 0; index < dutyFormulaDetailList.length; index++) {
            const dutyCd = dutyFormulaDetailList[index].dutyCd;
            switch (dutyCd) {
              case 'VAT':
                dutyValue.vatValue = Number(GlobalMethods.vatDI(dutyValue.amount, dutyValue.vatPercent));
                break;

              case 'SD':
                dutyValue.sDValue = Number(GlobalMethods.sdDI(dutyValue.amount, Number(dutyValue.vatValue), dutyValue.sDPercent));
                break;

              default:
                break;
            }
          }
        }
      }
      else {
        if (dutyFormulaDetailList.length > 0) {
          for (let index = 0; index < dutyFormulaDetailList.length; index++) {
            const dutyCd = dutyFormulaDetailList[index].dutyCd;
            switch (dutyCd) {
              case 'VAT':
                dutyValue.vatValue = Number(GlobalMethods.vatDE(dutyValue.amount, Number(dutyValue.sDValue), dutyValue.vatPercent));
                break;

              case 'SD':
                dutyValue.sDValue = Number(GlobalMethods.sdDE(dutyValue.amount, dutyValue.sDPercent));
                break;

              default:
                break;
            }
          }
        }
      }
      return dutyValue;
    } catch (e) {
      throw e;
    }
  }

  applyPoints(redeemPointModel:RedeemPointModel){
    try {
      this.orderDTO.invoicePaymentDetail.usedPoint = redeemPointModel.usedPoint;
      this.orderDTO.invoicePaymentDetail.pointAmount = redeemPointModel.pointAmount;
       this.orderDTO.roundAmount = 
       this.calculatePayableAmount(
        this.orderDTO.totalAmount - this.orderDTO.invoicePaymentDetail.pointAmount
      );
      this.setLocalStorage('orderDTO', this.orderDTO);
      // this.calculatePaymentInfo();
    } catch (e) {
      throw e;
    }
  }

}

