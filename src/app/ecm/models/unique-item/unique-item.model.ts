import { ImageFile } from "src/app/shared/models/common.model";
import { GlobalConstants as GC, ICharachterLength, ValidatingObjectFormat } from "../..";
import { OrderItemComboDetail, OrderItemTopping } from "../order/order.model";

export class UniqueItemDTO {
  uniqueItemCodeID: number = null;
  // mealID: number = null;
  itemID: number = null;
  item: string = null;
  variationsName: string = null;
  actualVariationsName: string = null;
  itemCode: string = null;
  itemDescription: string = null;
  imageID: number = null;
  imageFileName: string = null;
  uOMID: number = null;
  sUOMSN: string = null;
  unitPrice: number = null;
  offerUnitPrice:number = null;
  allowFractionalSale: boolean = false;
  isDefault:boolean = false;
  isDealItem: boolean = false;
  isSpicy: boolean = false;
  isDelivery: boolean = false;
  isAddonItem: boolean = false;
  isCustomizable: boolean = false;
  deliveryStatus:string = null;
  isSecondaryUnit: boolean = false;
  secondaryUnitPrice: number = null;
  secondaryOfferUnitPrice: number = null;
  secondaryUnit: string = null;
  uniqueItemList: any = [];
  qty: any = "1";
  salesPriceList: ItemSalePrice[] = [];
  imageFile = new ImageFile();
  selectedItem: any = {};
  selectedUnitID: number = null;
  selectedUOMSN: number = null;

  isCustomize: boolean = false;
  orderItemToppingList: OrderItemTopping[] = [];
  totalToppingPrice: number = 0;
  totalToppingOfferPrice:number = 0;


  spiceCd: number = null;
  spiceOption: string = null;
  uniqueItemDetail: string = null;
  displayItemDetail: string = null;
  maxQty:number = null;
  imageFilePath:string = null;
  isSwipable:boolean = false;
  isNonDiscItem:boolean = false;
  itemDisplayCategoryID:number = null;
  orderItemComboDetailList: OrderItemComboDetail[] = [];
  offerImageFilePath:string = null;
  constructor(defaultData?: Partial<UniqueItemDTO>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class ItemSalePrice {
  uOMID: number = null;
  sUOMSN: string = null;
  unitPrice: number = 0;
  vat: number = 0;
  vATPrcnt: number = 0;
  sD: number = 0;
  sDPrcnt: number = 0;
  orderItemDutyList: any = [];
  duties: number = 0;
  allowFractionalSale: boolean = false;
  constructor(defaultData?: Partial<ItemSalePrice>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class MenuItem {
  id: number = 0;
  itemSalePriceID: number = 0;
  dutyID: number = 0;
  value: number = 0;
  percent: number = 0;
  isEnabled: boolean = false;
  isSelected: boolean = false;
  tag: number = 0;

  constructor(defaultData?: Partial<MenuItem>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export function itemSalesPriceValidation(): any {
  return {
    itmSalesPriceValidateModel: {
      salePrice: {
        required: GC.validationMsg.saleprice,
        maxlength: {
          message: 'Max length 8!',
          length: 8
        } as ICharachterLength,
      },
      effectiveDate: {
        required: GC.validationMsg.effectivedate
      }
    } as ValidatingObjectFormat
  };
}

export class DutyValue {
  amount: number = 0;
  vatValue: number = 0;
  vatPercent: number = 0;
  sDValue: number = 0;
  sDPercent: number = 0;
  constructor(defaultData?: Partial<DutyValue>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}