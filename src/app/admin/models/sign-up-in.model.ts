
import { GlobalConstants, ValidatingObjectFormat } from "src/app/app-shared/models/javascriptVariables";
import { FixedIDs } from "src/app/shared";
import { ICharachterLength, IPattern } from "src/app/shared/models/common.model";

export class SignUpInModel {
  mobileNo: string = null;
  password: string = null;
  email:string = null;
  name:string = null;
  confirmPassword: string = null;
  reEnterPassword: string = null;
  challengeKey: string = null;
  generatedChallangeKey: string = null;
  oTP: string = null;
  countingTime: number = null;
  isRegisteredByPassord: boolean = false;
  isRememberPassword: boolean = false;

  constructor(defaultData?: Partial<SignUpInModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}
export function signUpInValidation(): any {
  return {
    signUpInValidateModel: {
      mobileNo: {
        required: GlobalConstants.validationMsg.mobilenumber,
        maxlength: {
          message: "Value max length 14",
          length: 14,
        } as ICharachterLength,
        pattern: {
          message: "Enter Valid Mobile No",
          regex: "(^(\\+88)?(01){1}[3456789]{1}(\\d){8})$"
        } as IPattern
      },
      password: {
        required: GlobalConstants.validationMsg.password,
        maxlength: {
          message: "Value max length 16",
          length: 16,
        } as ICharachterLength
      },
      reEnterPassword: {
        required: GlobalConstants.validationMsg.reenterpassword,
      },
      confirmPassword: {
        required: GlobalConstants.validationMsg.confirmpassword,
      },
      challengeKey:
      {
        required: GlobalConstants.validationMsg.challengekey,
      },
      oTP:
      {
        required: GlobalConstants.validationMsg.otp,
      }
    } as ValidatingObjectFormat,
  };
}
export class CustomerDTO {
  id: number = 0;
  memberID: string = null;
  mobileNo: string = null;
  altMobileNo: string = null;
  email: string = null;
  password: string = null;
  name: string = null;
  dOB: Date = null;
  genderCd: string = null;
  profilePicFileName: string = null;
  memberRegisterDateTime: Date = null;
  memberAddSrc: number = FixedIDs.memberAddSrc.ECOM;
  passwordCreationDateTime: Date = null;
  isPasswordExpired: boolean = false;
  isActive: boolean = true;
  relationship: string = '';
  languageCode: string='';
  //extra properties
  customerPassword: string = null;
  availablePoint:number = 0;
  customerSocialMediaLogIn:CustomerSocialMediaLogIn = null;
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
export class UserLogIn {
  id: number = 0;
  customerID: number = 0;
  mobileNo: string = null;
  email: string = null;
  logInDate: Date = GlobalConstants.serverDate;
  logInTime: string = null;
  logOutDate: Date = null;
  logOutTime: string = null;
  isPasswordLogIn: boolean = false;
  constructor(defaultData?: Partial<UserLogIn>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class ForgotPasswordModel {
  customerID: number = null;
  mobileNo: string = null;
  email: string = null;
  isSMSCode: boolean = true;
  isEmailCode: boolean = true;
  constructor(defaultData?: Partial<ForgotPasswordModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export function forgotPasswordValidation(): any {
  return {
    forgotPasswordValidateModel: {
      mobileNo: {
        required: GlobalConstants.validationMsg.mobilenumber,
        maxlength: {
          message: "Value max length 14",
          length: 14,
        } as ICharachterLength,
        pattern: {
          message: "Enter Valid Mobile No",
          regex: "(^(\\+88)?(01){1}[3456789]{1}(\\d){8})$"
        } as IPattern
      },
      email: {
        required: GlobalConstants.validationMsg.email,
        maxlength: {
          message: "Value max length 30",
          length: 30,
        } as ICharachterLength,
        pattern: {
          message: "Enter Valid Email",
          regex: "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
        } as IPattern
      },
      challengeKey:
      {
        required: GlobalConstants.validationMsg.challengekey,
      }
    } as ValidatingObjectFormat,
  };
}
export class ChangePasswordModel {
  customerID: number = null;
  password: string = null;
  reEnterPassword: string = null;
  currentPassword: string = null;
  isCurrentPasswordMatch: boolean = false;
  type: number;
  constructor(defaultData?: Partial<ChangePasswordModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export function changePasswordValidation(): any {
  return {
    changePasswordValidateModel: {
      password: {
        required: GlobalConstants.validationMsg.password,
        maxlength: {
          message: "Value max length 16",
          length: 16,
        } as ICharachterLength
      },
      reEnterPassword: {
        required: GlobalConstants.validationMsg.reenterpassword,
      },
      currentPassword: {
        required: GlobalConstants.validationMsg.currentpassword,
      }
    } as ValidatingObjectFormat,
  };
}

export class PasswordRuleModel {
  isEnablePasswordRule: boolean = false;
  isMixLetterAndNumber: boolean = false;
  isMustContainSpecialCharacter: boolean = null;
  isMustContainUpperAndLower: boolean = null;
  passwordLength: number = null;
  passwordNote: string = null;
  passwordExpiryPeriod: number = null;

  constructor(defaultData?: Partial<PasswordRuleModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class ChallengeKeyModel {
  isEnableChallengeKey: boolean = true;
  challengeKeyLength: number = 0;
  isAlphabetOnly: boolean = false;
  isNumericOnly: boolean = false;
  generatedChallangeKey: string = null;
  challengeKey: string = null;

  constructor(defaultData?: Partial<ChallengeKeyModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class AuthenticateModel {
  userName: string = null;
  password: string = null;
  constructor(defaultData?: Partial<AuthenticateModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class CustomerLoginConfigModel {
  isLoginWithOTP:boolean = false;
  isLoginWithPassword:boolean = false;
  isLoginWithFB:boolean = false;
  isLoginWithGoogle:boolean = false;
  constructor(defaultData?: Partial<CustomerLoginConfigModel>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}




export class CustomerSocialMediaLogIn {
  id:number = 0;
  customerID: number = 0;
  accountID: string = null;
  accountName: string = null;
  uniqueID: string = null;
  constructor(defaultData?: Partial<CustomerSocialMediaLogIn>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}







