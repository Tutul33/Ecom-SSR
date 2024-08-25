import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FixedIDs, IRange, GlobalConstants as GC, ValidatingObjectFormat, ICharachterLength, GlobalMethods, GlobalConstants } from "../..";
import { ImageFile } from "src/app/shared/models/common.model";

export class Order {
  id: number = 0;
  invoiceID: number = null;
  storeID: number = null;
  customerID: number = null;
  thirdPartyID: number = null;
  orderNo: string = null;
  uniqueOrderNo: string = null;
  thirdPartyOrderNo: string = null;
  orderCategoryCd: string = FixedIDs.orderCategory['Ecommerce'];
  orderTypeCd: string = null;
  subTotal: number = 0;
  totalDuties: number = 0;
  deliveryCharge: number = 0;
  totalDiscount: number = 0;
  totalAmount: number = 0;
  roundAmount: number = 0;
  returnedAmount: number = 0;
  orderPlaceDate: Date = GC.serverDate;
  orderPlaceTime: string = null;
  isOrderConfirm: boolean = false;
  orderTrackLink: string = null;
  orderReceivedByID: number = null;
  isDutyIncluded: boolean = false;
  isPaid: number = FixedIDs.paymentStatus.NotDefined;
  isGift: boolean = false;
  lastUpdate: Date = GC.serverDate;
  orderPaymentDate: Date = null;
  orderPaymentTime: string = null;
  guestNo: number = null;
  earnedPoint:number = 0;
  SrcCd:number = 0;
  isIdentityVerified:boolean = false;
  serviceCharge:number = 0;
  serviceChargeDuty:number = 0;
  tag: number = 0;

  totalItem: number = null;
  totalQty: number = null;
  orderDisplayPaymentDateTime: string = null;
  hasMultipleOrder: boolean = false;
  codeGenPropertyVal: string = null;
  locationID: number = GC.userInfo.locationID;

  changedAmount: number = 0;
  orderTrackingPageUrl: string = null;
  roundAmountInWord: string = null;
  orderType: string = null;
  paymentStatus: string = null;
  orderDeliveryTime: string = null;
  isPaymentMethodOk: boolean = false;
  orderCategory: string = null;
  customer: string = null;
  customerMobile: string = null;
  orderDisplayDateTime: string = null;
  paymentMethod: string = null;

  storeShortName: string = null;
  thirdPartyName: string = null;

  vat: number = 0;
  sD: number = 0;

  orderDeliveryDetail: OrderDeliveryDetail = new OrderDeliveryDetail();
  orderStatus: OrderStatus = new OrderStatus();
  orderGift: OrderGift = new OrderGift();
  orderActiveStatus: OrderActiveStatus = new OrderActiveStatus();
  invoicePaymentDetail: InvoicePaymentDetail = new InvoicePaymentDetail();
  invoiceOrder: InvoiceOrder = new InvoiceOrder();

  orderItemList: any = [];
  orderPaymentList: any = [];
  orderTableList: any = [];
  selectedPaymentInfo: any = {};
  instantDiscount: number = 0;
  amount: number = 0;
  cancelledOrderItemList: any = [];
  insertUserID: number = null;
  authorizedByID: number = null;
  pointAmount:number = 0;
  isNeedToIdentify:boolean = false;
  couponList:CouponModel[] = [];
  invoiceMemberBenefitList:InvoiceMemberBenefit[] = [];
  membershipDiscount:number = 0;
  extraOrdList:Order[] = [];
  constructor(defaultData?: Partial<Order>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class OrderItem {
  id: number = 0;
  orderID: number = 0;
  customerID: number = null;
  thirdPartyID: number = null;
  matID: number = null;
  uniqueItemCodeID: number = null;
  itemDetail: string = null;
  spiceCd: number = null;
  mealID: number = null;
  mealDetail: string = null;
  isAddonItem: boolean = false;
  uOMID: number = null;
  qty: number = null;
  unitPrice: number = 0;
  totalToppingPrice: number = 0;
  duties: number = 0;
  discountDuties: number = 0;
  totalPrice: number = 0;
  discountPrice: number = 0;
  toppingItemDescription: string = null;
  isCancelled: boolean = false;
  note:string = null;
  mainOrderItemID:number = null;
  tag: number = 0;

  //DTO  
  menuID: number = null;
  itemMapID: number = null;
  slNo: number = null;
  isDefault: boolean = false;
  isActive: boolean = false;
  imagePath: string = null;

  item: string = null;
  variationsName: string = null;
  itemDescription: string = null;
  itemDescriptionShort: string = null;
  itemCode: string = null;
  itemID: number = null;
  itemDetailCodeItemID: number = null;
  imageID: number = null;
  imageFileName: string = null;
  addedToppings: string = null;
  replacedToppings: string = null;
  removedToppings: string = null;
  isNonRange: boolean = false;
  isSpicy: boolean = false;
  hasResaleItem: boolean = false;
  uniqueItemDetail: string = null;
  spiceOption: string = null;
  isDeal: boolean = false;

  isReturnable: boolean = false;
  isDelivery: boolean = false;

  cancelledOrderItem: CancelledOrderItem = null;
  resaleOrderItem: ResaleOrderItem = null;
  orderItemToppingList: OrderItemTopping[] = [];
  orderItemDutyList: any = [];

  sUOM: string = null;
  sUOMSN: string = null;
  isUnavailable: boolean = false;
  isRestricted: boolean = false;
  unitDiscPrice: number = 0;
  allowFractionalSale: boolean = false;
  salesPriceList: any = [];
  displayItemDetail: string = null;
  maxQty:number = null;
  imageFilePath:string = null;
  isSwipable:boolean = false;
  orderItemComboDetailList: OrderItemComboDetail[] = [];
  offerUnitDiscount:number = 0;
  offerDiscountPercent:number = 0;
  itemDisplayCategoryID:number = null;
  orderItemOfferList: OrderItemOffer[] = [];
  offerItemList:OrderItem[] = [];
  membershipUnitDiscount:number = 0;
  memberDiscountPercent:number = 0;
  isNonDiscItem:boolean = false;
  totalToppingOfferPrice:number = 0;
  offerUnitPrice:number = 0;
  constructor(defaultData?: Partial<OrderItem>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}


export class CancelledOrderItem {
  id: number = 0;
  orderItemID: number = 0;
  cancelReason: string = null;
  remarks: string = null;
  cancelByID: number = null;
  cancelledDateTime: Date = GC.serverDate;
  uOMID: number = 0;
  qty: number = null;
  processedQty: number = null;
  damageQty: number = 0;

  damageItemAttachment: any = [];
  damageReason: string = null;
  locationID: number = GC.userInfo.locationID;
  insertUserID: number = null;
  tag: number = 0;
  orderQty: number = null;
  returnValue: number = 0;
  itemCode: string = null;
  itemDetailList: any = [];

  orderItemList: any = [];
  constructor(defaultData?: Partial<CancelledOrderItem>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}



export class ResaleOrderItem {
  id: number = 0;
  orderItemID: number = 0;
  cancelledOrderItemID: number = 0;
  rate: number = 0;
  uOMID: number = 0;
  qty: number = 0;

  tag: number = 0;

  discOfferValue: number = 0;
  constructor(defaultData?: Partial<ResaleOrderItem>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}


export class OrderGift {
  id: number = 0;
  invoiceID: number = 0;
  customerMobileNo: string = null;
  customerName: string = null;
  membershipID: string = null;
  giftReason: string = null;
  giftByID: number = null;
  relationship: string = null;
  designation: string = null;
  remarks: string = null;
  giftDateTime: Date = GC.serverDate;
  tag: number = 0;
  discOfferValue: number = 0;
  constructor(defaultData?: Partial<OrderGift>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class OrderDeliveryDetail {
  id: number = 0;
  orderID: number = 0;
  customerID: number = null;
  latitude: string = null;
  longitude: string = null;
  deliveryAddress: string = null;
  contactNo: string = null;
  storeID: number = null;
  storeLatitude: string = null;
  storeLongitude: string = null;
  storeContactNo: string = null;
  isPreorder: boolean = false;
  preorderDate: Date = GlobalConstants.serverDate;
  preorderTime: string = null;
  tag: number = 0;

  relationship: string = null;
  designation: string = null;

  storeAddress: string = null;
  isOutOfRange: boolean = false;
  strOpeningTime: string = null;
  strClosingTime: string = null;
  customerName: string = null;
  storeName:string = null;
  memberID: string = null;
  mapAddress: string = null;
  customerContactNo: string = null;
  displayPreOrderDate:string = null;

  constructor(defaultData?: Partial<OrderDeliveryDetail>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class OrderStatus {
  id: number = 0;
  orderID: number = 0;
  customerID: number = null;
  statusCd: string = FixedIDs.orderStatus.Placed;
  isActive: boolean = true;
  actionDoneByID: number = null;
  actionDateTime: Date = GC.serverDate;
  status: string = null;

  constructor(defaultData?: Partial<OrderStatus>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class OrderActiveStatus {
  id: number = 0;
  orderID: number = 0;
  statusCd: number = FixedIDs.activityStatus.Active;
  isActive: boolean = true;
  actionDoneByID: number = null;
  actionDateTime: Date = GC.serverDate;
  reason: string = null;

  status: string = "Start";
  constructor(defaultData?: Partial<OrderActiveStatus>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class OrderPayment {
  id: number = 0;
  invoiceID: number = 0;
  paymentTypeCd: number = null;
  paymentMethodCd: number = null;
  amount: number = 0;
  isPaid: boolean = false;

  paymentTypeValue: string = null;
  tag: number = 0;
  paymentDetailList: any = [];

  service: string = '';

  constructor(defaultData?: Partial<OrderPayment>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class PaymentDetail {
  id: number = 0;
  orderPaymentID: number = 0;
  paymentGatewayServiceID: number = null;
  paymentGatewayCardID: number = null;
  amount: number = 0;
  transactionID: string = null;
  tag: number = 0;


  constructor(defaultData?: Partial<PaymentDetail>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class OrderItemDuty {
  id: number = 0;
  orderID: number = 0;
  orderItemID: number = 0;
  vatValue: number = 0;
  vatPercent: number = 0;
  vatDiscount: number = 0;
  sDValue: number = 0;
  sDPercent: number = 0;
  sDDiscount: number = 0;
  tag: number = 0;

  unitVatValue: number = 0;
  unitSDValue: number = 0;
  unitVatDiscValue: number = 0;
  unitSDDiscValue: number = 0;

  constructor(defaultData?: Partial<OrderItemDuty>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

// export class OrderItemToppingDuty {
//   id: number = 0;
//   orderID: number = 0;
//   toppingItemID: number = 0;
//   vatValue: number = 0;
//   vatPercent: number = 0;
//   sDValue: number = 0;
//   sDPercent: number = 0;
//   tag: number = 0;

//   dutyValue: number = null;
//   unitVatValue: number = 0;
//   unitSDValue: number = 0;
//   constructor(defaultData?: Partial<OrderItemToppingDuty>) {
//     defaultData = defaultData || {};
//     Object.keys(defaultData).forEach((key) => {
//       const value = defaultData[key];
//       if (this.hasOwnProperty(key)) {
//         this[key] = value;
//       }
//     });
//   }
// }

export class InvoiceOrder {
  id: number = 0;
  invoiceNo: string = null;
  createdByID: number = null;
  invoiceDatetime: Date = GC.serverDate;
  lastUpdate: Date = GC.serverDate;
  isPaid: boolean = null;
  tableNos: string = null;
  waiters: string = null;
  isCancelled: boolean = false;
  tag: number = 0;

  invoiceOfferDetailList:InvoiceOfferDetails[] = [];
  dutyValue: number = null;
  constructor(defaultData?: Partial<InvoiceOrder>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}


export class OrderItemTopping {
  id: number = 0;
  orderItemID: number = 0;
  toppingItemCodeID: number = null;
  toppingItemDescription: string = null;
  isAdded: boolean = false;
  isRemoved: boolean = false;
  isReplaced: boolean = false;
  replacedItemCodeID: number = null;
  replacedItemDescription: string = null;
  uOMID: number = null;
  qty: number = 1;
  price: number = 0;
  tag: number = 0;

  itemCode: string = null;
  itemName: string = null;
  imageID: number = null;
  itemDescription: string = null;
  variationsName: string = null;
  photoFile: any = null;
  sUOMSN: string = null;

  duties: number = null;
  maxQty: number = 1;
  isNonRange: boolean = false;
  isSpicy: boolean = false;
  isReturnable: boolean = false;
  isDelivery: boolean = false;


  toppingCategoryCd: number = null;
  isReplaceable: boolean = false;
  isRemoval: boolean = false;
  isChecked: boolean = false;
  imageFilePath:string = null;
  offerUnitPrice:number = 0;
  constructor(defaultData?: Partial<OrderItemTopping>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}


export class OrderTable {
  id: number = 0;
  orderID: number = 0;
  tableMapID: number = null;
  occupiedDateTime: Date = GC.serverDate;;
  duration: number = null;
  tableGroupNo: number = null;
  tag: number = 0;

  //dto
  tableNo: string = null;
  waiter: string = null;


  constructor(defaultData?: Partial<OrderTable>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}



export class InvoicePaymentDetail {
  id: number = 0;
  invoiceID: number = 0;
  totalDuties: number = 0;
  deliveryCharge: number = 0;
  instantDiscount: number = 0;
  totalDiscount: number = 0;
  subTotal: number = 0;
  totalAmount: number = 0;
  roundAmount: number = 0;
  receivedAmount: number = 0;
  returnedAmount: number = 0;
  note: string = "";
  discountReasonID: number = null;
  discountRemarks: string = null;
  discountCustomerContact: string = null;
  discountCreatedByID: string = null;
  discountApplyDateTime: string = null;
  discountAppliedIn: number = 0;
  usedPoint: number = 0;
  pointAmount:number = 0;
  membershipDiscount:number = 0;
  currentPOSUserAllocationID:number = null;
  serviceCharge:number = 0;
  serviceChargeDuty:number = 0;
  tag: number = 0;

  discountReason: string = null;
  orderGift: OrderGift = new OrderGift();
  locationID: number = GC.userInfo.locationID;
  isGift: boolean = false;
  isOrderConfirmed: boolean = false;
  orderPaymentList: any = [];
  extraInvoiceIds: any = [];
  instantDiscountPercent: number = 0;
  // isInsDiscByAmount:boolean = true;
  changedAmount: number = 0;
  orderList: any = [];
  extraInvoiceDateTimeList: any = [];
  invoiceLastUpdate: Date = null;
  tableNos: string = null;
  waiters: string = null;
  availablePoint:number = 0;
  constructor(defaultData?: Partial<InvoicePaymentDetail>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class MultiOrder {
  id: number = 0;
  invoiceID: number = null;
  customerID: number = null;
  thirdPartyID: number = null;
  orderNo: string = null;
  uniqueOrderNo: string = null;
  thirdPartyOrderNo: string = null;
  orderCategoryCd: string = null;
  orderTypeCd: string = null;
  subTotal: number = 0;
  totalDuties: number = 0;
  deliveryCharge: number = 0;
  totalDiscount: number = 0;
  totalAmount: number = 0;
  roundAmount: number = 0;
  receivedAmount: number = 0;
  returnedAmount: number = 0;
  orderPlaceDate: Date = GC.serverDate;
  orderPlaceTime: string = null;
  note: string = null;
  isOrderConfirm: boolean = false;
  orderTrackLink: string = null;
  orderReceivedByID: number = null;
  isDutyIncluded: boolean = false;
  isPaid: number = FixedIDs.paymentStatus.NotDefined;
  isGift: boolean = false;
  lastUpdate: Date = GC.serverDate;
  tag: number = 0;


  codeGenPropertyVal: string = null;
  locationID: number = GC.userInfo.locationID;

  changedAmount: number = 0;
  orderTrackingPageUrl: string = null;
  roundAmountInWord: string = null;
  orderType: string = null;
  paymentStatus: string = null;
  orderDeliveryTime: string = null;
  isPaymentMethodOk: boolean = false;
  orderCategory: string = null;
  customer: string = null;
  customerMobile: string = null;
  orderDisplayDateTime: string = null;
  paymentMethod: string = null;

  storeShortName: string = null;
  thirdPartyName: string = null;

  invoicePaymentDetailID: number = 0;


  orderDeliveryDetail: OrderDeliveryDetail = new OrderDeliveryDetail();
  orderStatus: OrderStatus = new OrderStatus();
  orderGift: OrderGift = new OrderGift();
  orderActiveStatus: OrderActiveStatus = new OrderActiveStatus();
  invoiceOrder: InvoiceOrder = new InvoiceOrder();
  invoicePaymentDetail: InvoicePaymentDetail = new InvoicePaymentDetail();


  orderItemList: any = [];
  orderPaymentList: any = [];
  orderTableList: any = [];
  selectedPaymentInfo: any = {};
  amount: number = 0;
  constructor(defaultData?: Partial<MultiOrder>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}


export class PayProcess {

  paymentProcessID: number = 0;
  paymentProcessItems: any = [];
  paymentMethodValue: string = null;
  paymentTypeValue: string = null;
  isSelected: boolean = false;
  constructor(defaultData?: Partial<PayProcess>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class PayProcessService {

  isActive: boolean = false;
  tag: number = 0;
  paymentGatewayServiceID: number = null;
  bankCardTypeID: number = null;
  /*paymentGatewayCardID: number = null;
  service: string = null;
  companyName: string = null;
  logoFileName:string = null;
  serviceContactNo:string = null;
  serviceEmailAddress:string = null;
  serviceApiLink:string = null;
  paymentGatewayID:number = null;
  storeID:number = null;
  accountName:string = null;
  qRLogoFileName:string = null;
  paymentProcessItemID: number = null;
  paymentMethodCd: number = null;
  paymentTypeCd: number = null;
  */

  constructor(defaultData?: Partial<PayProcessService>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }

}




export function orderDeliveryDetailValidation(): any {
  return {
    orderDeliveryDetailValidateModel: {
      preorderDate: {
        required: GC.validationMsg.date,
      },
      preorderTime: {
        required: GC.validationMsg.time
      }
    } as ValidatingObjectFormat
  };
}

export function paymentDetailValidation(): any {
  return {
    paymentDetailValidateModel: {
      transactionID: {
        required: GC.validationMsg.transactionid,
        maxlength: {
          message: "Value max length 20 ",
          length: 20,
        } as ICharachterLength,
      }
    } as ValidatingObjectFormat
  };
}

export function invoicePaymentValidation(): any {
  return {
    invoicePaymentValidateModel: {
      discountReasonID: {
        required: GC.validationMsg.discountreason
      },
      instantDiscount: {
        required: GC.validationMsg.instantdiscount
      },
      instantDiscountPercent: {
        required: GC.validationMsg.instantdiscountpercent,
        range: {
          message: 'Value should be 0 to 100',
          startValue: 0,
          endValue: 100
        } as IRange
      },
      discountCustomerContact: {
        maxlength: {
          message: "Value max length 15",
          length: 15,
        } as ICharachterLength,
      },
      discountRemarks: {
        maxlength: {
          message: "Value max length 200",
          length: 200,
        } as ICharachterLength,
      }
    } as ValidatingObjectFormat
  };
}

export function posOrderValidation(): any {
  return {
    posOrderValidationModel: {
      qty: {
        required: GC.validationMsg.quantity,
        range: {
          message: 'Minimum value should be 1',
          startValue: 1,
          endValue: 999999
        } as IRange,
        customValidator:{
          method: maxQtyValidator()
        }
      },
      fractionalQty: {
        required: GC.validationMsg.quantity,
        range: {
          message: 'Minimum value should be greater than 0',
          startValue: 0.0001,
          endValue: 999999
        } as IRange
      }
    } as ValidatingObjectFormat,
    spicyOptionValidationModel: {
      qty: {
        customValidator:{
          method: maxQtyValidator()
        }
      }
    } as ValidatingObjectFormat
  };
}

export function maxQtyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const maxQty = control["nativeElement"].getAttribute("max") || null;
    if(maxQty > 0)
    {
      if(value > maxQty)
      {
        return { qty: { message: "Maximum value should be " +  maxQty} }
      }
    }
    return null;
  };
}

export class PaymentType{

  id: number = 0;
  paymentProcessID: number = null;
  paymentTypeCd: number = null;
  description: string = null;
  instruction: string = null;
  title: string = null;
  isEnable: boolean = null;

  constructor(defaultData?: Partial<PaymentType>) {
      defaultData = defaultData || {};
      Object.keys(defaultData).forEach((key) => {
        const value = defaultData[key];
        if (this.hasOwnProperty(key)) {
          this[key] = value;
        }
      });
    }
}


export class OrderTrack {
  status:string = null;
  statusCd:string = null;
  isCompleted:boolean = false;
  isActive: boolean = false;
  actionDateTime:string = null;
  imgSrc:string = null;

  constructor(defaultData?: Partial<OrderTrack>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class OrderItemComboDetail {
  id: number = 0;
  orderItemID: number = 0;
  mealID: number = null;
  mealItemDetailID: number = null;
  replacedMealItemDetailID:number = null;
  itemDetailCodeItemID: number = null;
  spiceCd: number = null;
  coldCd: number = null;
  uOMID: number = null;
  qty: number = 0;
  priceDI: number = 0;
  priceDE: number = 0;
  vATPercent: number = 0;
  vat: number = 0;
  sDPercent: number = 0;
  sD: number = 0;
  isRemoved:boolean = false;
  tag: number = 0;

  variationsName:string = null;
  sUOMSN:string = null;
  itemCode:string = null;
  imageID:number = null;
  imageFileName:string = null;
  isSpicy:boolean = false;
  isPriceDeducted:boolean = false;
  isRemovable:boolean = false;
  isUpdateable:boolean = false;
  isSwipable:boolean = false;
  spiceOption:string = null;
  imageFilePath:string = null;
  constructor(defaultData?: Partial<OrderItemComboDetail>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class InvoiceAttachmentDTO extends ImageFile {
  invoiceID:number = null;
  locationID:number = GlobalConstants.userInfo.locationID;
  insertUserID:number = GlobalConstants.userInfo.userPKID;
  constructor(defaultData?: Partial<InvoiceAttachmentDTO>) {
    super();
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export function redeemPointValidation(): any {
  return {
    redeemPointValidateModel: {
      usedPoint: {
        required: GC.validationMsg.redeempoints
      },
      pointAmount: {
        required: GC.validationMsg.redeemmonetoryvalue
      }
    } as ValidatingObjectFormat
  };
}


export class RedeemPointModel extends ImageFile {
  customerName:string = null;
  memberID:string = null;
  availablePoint:number = 0;
  usedPoint:number = 0;
  pointAmount:number = 0;
  totalAmount:number = 0;

  constructor(defaultData?: Partial<RedeemPointModel>) {
    super();
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class CouponModel {
  id:number = 0;
  offerID:number = null;
  couponCode:string = null;
  tag:number = 0;
  constructor(defaultData?: Partial<CouponModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export function couponValidation(): any {
  return {
    couponValidateModel: {
      couponCode: {
        required: GC.validationMsg.couponcode
      }
    } as ValidatingObjectFormat
  };
}


export class InvoiceOfferDetails {
  id:number = 0;
  offerID:number = null;
  couponCode:string = null;
  memberID:number = null;
  invoiceID:number = 0;
  invoiceNo:number = null;
  usageDateTime:Date = GlobalConstants.serverDate;
  discountAmount:number = 0;
  tag:number = 0;
  constructor(defaultData?: Partial<InvoiceOfferDetails>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}


export class OrderItemOffer {
  id:number = 0;
  orderItemID:number = 0;
  offerID:number = null;
  couponID:number = null;
  OfferGiftID:number = null;
  offerGiftQty:number = 0;
  offerAmount:number = 0;
  offerDefinitionName:string = null;
  offerCd:string = null;
  termNCondiText:string = null;
  couponCode:string = null;
  unitOfferAmount:number = 0;
  offerAmountPercent:number = 0;
  orderedItemID:number = 0;
  orderdQty:number = 0;
  offerItemID:number = 0;
  offerQty:number = 0;
  displayCategoryID:number = 0;
  variationsName:string = null;
  tag:number = 0;
  constructor(defaultData?: Partial<OrderItemOffer>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}


export class InvoiceMemberBenefit {
  id:number = 0;
  invoiceID:number = 0;
  MembershipBenefitID:number = null;
  discountAmount:number = 0;
  tag:number = 0;

  memberDiscountPercent:number = 0;
  constructor(defaultData?: Partial<InvoiceMemberBenefit>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}