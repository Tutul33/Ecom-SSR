
import { GlobalConstants, ValidatingObjectFormat } from "src/app/app-shared/models/javascriptVariables";
import { ICharachterLength, ImageFile, IPattern } from "src/app/shared/models/common.model";

export class CustomerDTO {
  id: number = 0;
  mobileNo: string = null;
  altMobileNo: string = null;
  email: string = null;
  password: string = null;
  name: string = null;
  dOB: Date = null;
  gender:string = null;
  genderCd: string = null;
  profilePicFileName: string = null;
  isActive:boolean = true;
  //extra properties
  imageFile: any = {};
  hasFile:boolean = false;
  displayDOB:string = null;
  userID:number = 0;
  constructor(defaultData?: Partial<CustomerDTO>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}
export function customerProfileValidation(): any {
    return {
      customerProfileValidateModel: {
        name: {
          maxlength:{
            message: "Value max length 50",
            length: 50,
          } as ICharachterLength
        },
         mobileNo: {
          required: GlobalConstants.validationMsg.mobilenumber,
          maxlength:{
            message: "Value max length 14",
            length: 14,
          } as ICharachterLength,
          pattern:{
            message:"Enter Valid Mobile No",
            regex:"(^(\\+88)?(01){1}[3456789]{1}(\\d){8})$"
          } as IPattern
        },
        altMobileNo: {
          maxlength:{
            message: "Value max length 14",
            length: 14,
          } as ICharachterLength,
          pattern:{
            message:"Enter Valid Mobile No",
            regex:"(^(\\+88)?(01){1}[3456789]{1}(\\d){8})$"
          } as IPattern
        },
        email: {
          maxlength:{
            message: "Value max length 30",
            length: 50,
          } as ICharachterLength,
          pattern:{
            message:"Enter Valid Email",
            regex:"[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
          } as IPattern
        }
      } as ValidatingObjectFormat,
    };
}

export class CustomerAddress {
  id:number = 0;
  customerID:number = null;
  latitude: number = null;
  longitude: number = null;
  address:string = null;
  isDefault:boolean = false;
  mapAddress:string = null;
  constructor(defaultData?: Partial<CustomerAddress>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export function customerAddressValidation(): any {
  return {
    customerAddressValidateModel: {
      address: {
        required: GlobalConstants.validationMsg.address,
        maxlength:{
          message: "Value max length 100",
          length: 100,
        } as ICharachterLength
      },
      googleAddress: {
        required: GlobalConstants.validationMsg.googleaddress,
        maxlength:{
          message: "Value max length 100",
          length: 100,
        } as ICharachterLength
      }
    } as ValidatingObjectFormat,
  };
}







