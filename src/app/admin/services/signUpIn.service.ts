import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CustomerDTO, SignUpInModel, ForgotPasswordModel, ChangePasswordModel, PasswordRuleModel, ChallengeKeyModel, AuthenticateModel, CustomerLoginConfigModel, CustomerSocialMediaLogIn } from '../models/sign-up-in.model';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  ApiService,
  GlobalConstants,
  OTPModel,
  ConfigService,
  Config,
  FixedIDs,
  AdminConfig
} from '../index';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class SignUpInDataService {
  controllerName = Config.url.ecomLocalUrl + "Admin";
  controllerCustomerProfile = Config.url.ecomLocalUrl + "CustomerProfile";

  constructor(private apiSvc: ApiService,@Inject(PLATFORM_ID) private platformId: Object) { }

  save(customer: CustomerDTO): Observable<any> {
    try {
      return this.apiSvc.save(`${this.controllerName}/CreateUser`, customer, true);
    } catch (e) {
      throw e;
    }
  }

  savePassword(customer: ChangePasswordModel): Observable<any> {
    try {
      return this.apiSvc.save(`${this.controllerName}/ConfirmPassword`, customer, true);
    } catch (e) {
      throw e;
    }
  }

  updateUserLogin(customerID: number): Observable<any> {
    try {
      return this.apiSvc.executeQuery(`${this.controllerName}/UpdateUserLogin`, { customerID: customerID });
    } catch (e) {
      throw e;
    }
  }

  signIn(authenticateModel: AuthenticateModel): Observable<any> {
    try {
      return this.apiSvc.save(`${this.controllerName}/LogIn`, authenticateModel, true);
    } catch (e) {
      throw e;
    }
  }

  getCustomerByMobileOrEmail(mobileNo: string, email: string, isVerifyMobile: boolean) {
    try {
      return this.apiSvc.executeQuery(`${this.controllerName}/GetCustomerByMobileOrEmail`, { mobileNo: mobileNo, email: email, isVerifyMobile: isVerifyMobile });
    } catch (e) {
      throw e;
    }
  }
  getCustMobileBySocialAccountID(accountID:string) {
    try {
      return this.apiSvc.executeQuery(`${this.controllerName}/GetCustMobileBySocialAccountID`, { accountID: accountID })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
    } catch (e) {
      throw e;
    }
  }

  checkPasswordExistByCustomerID(customerID: number): Observable<any> {
    try {
      return this.apiSvc.executeQuery(`${this.controllerName}/CheckPasswordExistByCustomerID`, { customerID: customerID });
    } catch (e) {
      throw e;
    }
  }
  getMemberDetailByID(id: number) {
    return this.apiSvc
      .executeQuery(`${this.controllerCustomerProfile}/GetMemberDetailByID`, { id: id })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }

}

@Injectable()
export class SignUpInModelService {
  signUpInModel: SignUpInModel;
  socialLoginModel:SignUpInModel;
  customerSocialMediaLogIn: CustomerSocialMediaLogIn;
  customerModel: CustomerDTO;
  tempSignUpInModel: SignUpInModel;
  forgotPasswordModel: ForgotPasswordModel;
  confirmOTPModel: OTPModel;
  customerLoginConfigModel: CustomerLoginConfigModel;
  isSubmitted: boolean = false;
  challengeKeyModel: ChallengeKeyModel;
  forgotPasswordVerifyOption: any = {};
  changePasswordMoel: ChangePasswordModel;
  passwordRuleModel: PasswordRuleModel;
  moduleName: any;
  pageConfigType: any;
  adminPageConfig: any;
  memberData: any = [];
  constructor(private router: Router, private configSvc: ConfigService,@Inject(PLATFORM_ID) private platformId2: any) {
  }

  setDefaultDataForSignUpIn(){
    try {
      this.signUpInModel = new SignUpInModel();
      this.challengeKeyModel = new ChallengeKeyModel();
      this.passwordRuleModel = new PasswordRuleModel();
      this.confirmOTPModel = new OTPModel();
      this.customerLoginConfigModel = new CustomerLoginConfigModel();

      this.pageConfigType = FixedIDs.pageConfigType;
      this.moduleName = GlobalConstants.ERP_MODULES.ADMIN.name;
      this.adminPageConfig = AdminConfig.adminPageConfig;
    } catch (e) {
      throw e;
    }
  }

  setDefaultDataForgotPassword(){
    try {
      this.forgotPasswordModel = new ForgotPasswordModel();
      this.confirmOTPModel = new OTPModel();
      this.challengeKeyModel = new ChallengeKeyModel();

      this.pageConfigType = FixedIDs.pageConfigType;
      this.moduleName = GlobalConstants.ERP_MODULES.ADMIN.name;
      this.adminPageConfig = AdminConfig.adminPageConfig;
    } catch (e) {
      throw e;
    }
  }

  checkSignUpInOnSubmit(formNo:number)
  {
    try {
      if (formNo == 3) //sign up/in by password
      {
        if (!this.signUpInModel.isRegisteredByPassord) {
          //check password match
          if (!this.checkPasswordMatch()) {
            this.setChallengeKey();
            this.isSubmitted = false;
            return '2060';
          }
        }
      }
      else {
        //check challenge key match
        if (this.challengeKeyModel.isEnableChallengeKey) {
          if (!this.checkChallengeKeyMatch()) {
            this.setChallengeKey();
            this.isSubmitted = false;
            return '2061';
          }
        }
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  checkForgotPasswordOnSubmit(){
    try {
       //check challenge key match
       if (this.challengeKeyModel.isEnableChallengeKey) {
        if (!this.checkChallengeKeyMatch()) {
          this.setChallengeKey();
          return { optionCode : 1, messageCode: '2061' };
        }
      }

      if (this.forgotPasswordModel.isSMSCode && this.forgotPasswordModel.isEmailCode) {
        if (!this.forgotPasswordModel.mobileNo && !this.forgotPasswordModel.email) {
          return { optionCode : 2, messageCode: '2069' };
        }
        return { optionCode : 2, messageCode: null };
      }
      else if (this.forgotPasswordModel.isSMSCode) {

        if (!this.forgotPasswordModel.mobileNo) {
          return { optionCode : 3, messageCode: '2070' };
        }
        return { optionCode : 3, messageCode: null };
      }
      else if (this.forgotPasswordModel.isEmailCode) {
        if (!this.forgotPasswordModel.mobileNo) {
          return { optionCode : 4, messageCode: '2071' };
        }
        return { optionCode : 4, messageCode: null };
      }
    } catch (e) {
      throw e;
    }
  }


  generateChallangeKey(challengkeyConfig: ChallengeKeyModel) {
    try {
      let randomChars = '';

      if (challengkeyConfig.isAlphabetOnly && !challengkeyConfig.isNumericOnly) {
        randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      }
      else if (challengkeyConfig.isNumericOnly && !challengkeyConfig.isAlphabetOnly) {
        randomChars = '0123456789';
      }
      else {
        randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      }
      let result = '';
      for (let i = 0; i < challengkeyConfig.challengeKeyLength; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  prepareCustomerModel(model: SignUpInModel) {
    try {
      this.customerModel = new CustomerDTO();
      this.customerModel.mobileNo = model.mobileNo;
      this.customerModel.customerPassword = model.password;
      this.customerModel.email = model.email;
      this.customerModel.name = model.name;
      this.customerModel.languageCode = GlobalConstants.defaultLanguageCode;
    } catch (e) {
      throw e;
    }
  }

  checkPasswordMatch() {
    try {
      if (this.signUpInModel.password != this.signUpInModel.reEnterPassword) {
        return false;
      }
      return true;
    } catch (e) {
      throw e;
    }
  }

  checkChallengeKeyMatch() {
    try {
      if (this.challengeKeyModel.challengeKey != this.challengeKeyModel.generatedChallangeKey) {
        return false;
      }
      return true;
    } catch (e) {
      throw e;
    }
  }

  setCustomerInformation(customerInfo: CustomerDTO) {
    try {
      GlobalConstants.customerInfo.id = customerInfo.id;
      GlobalConstants.customerInfo.mobileNo = customerInfo.mobileNo;
      GlobalConstants.customerInfo.altMobileNo = customerInfo.altMobileNo;
      GlobalConstants.customerInfo.email = customerInfo.email;
      GlobalConstants.customerInfo.name = customerInfo.name;
      GlobalConstants.customerInfo.dOB = customerInfo.dOB;
      GlobalConstants.customerInfo.genderCd = customerInfo.genderCd;
      GlobalConstants.customerInfo.profilePicFileName = customerInfo.profilePicFileName;
      GlobalConstants.customerInfo.memberID = customerInfo.memberID;
      GlobalConstants.customerInfo.languageCode = customerInfo.languageCode;
      this.configSvc.setLocalStorage('customerInfo', GlobalConstants.customerInfo);
    } catch (e) {
      throw e;
    }
  }

  setMemberInfo(data:any) {
    try {
      GlobalConstants.customerInfo.availablePoint = data.availablePoint;
      GlobalConstants.customerInfo.memberType = data.memberType;
      GlobalConstants.customerInfo.validityPeriod = data.validityPeriod;
      GlobalConstants.customerInfo.totalOrd = data.totalOrd;
      this.configSvc.setLocalStorage('customerInfo', GlobalConstants.customerInfo);
    } catch (e) {
      throw e;
    }
  }

  signOut(): void {
    try {
      this.clearLocalStorage();
      GlobalConstants.customerInfo.id = null;
      GlobalConstants.customerInfo.mobileNo = null;
      GlobalConstants.customerInfo.altMobileNo = null;
      GlobalConstants.customerInfo.email = null;
      GlobalConstants.customerInfo.name = null;
      GlobalConstants.customerInfo.dOB = null;
      GlobalConstants.customerInfo.genderCd = null;
      GlobalConstants.customerInfo.profilePicFileName = null;
      GlobalConstants.customerInfo.memberID = null;
      GlobalConstants.customerInfo.availablePoint = null;
      GlobalConstants.customerInfo.memberType = null;
      GlobalConstants.customerInfo.validityPeriod = null;
      if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
      }
    } catch (e) {
      throw e;
    }
  }
  platformId(platformId: any) {
    throw new Error('Method not implemented.');
  }


  clearLocalStorage() {
    try {

      if(isPlatformBrowser(this.platformId2))
        {        
      localStorage.removeItem('customerInfo');
      localStorage.removeItem('confirmedOrderInfo');
      localStorage.removeItem('orderDTO');
      localStorage.removeItem('orderTrackID');
        }
    } catch (e) {
      throw e;
    }
  }

  prepareChallengeKeyConfig(configList: any) {
    try {
      this.challengeKeyModel.isEnableChallengeKey = configList.filter(a => a.value == this.pageConfigType.ECK)[0].isActive;
      this.challengeKeyModel.challengeKeyLength = Number(configList.filter(a => a.value == this.pageConfigType.CKL)[0].pageConfigValue || 0);
      this.challengeKeyModel.isAlphabetOnly = configList.filter(a => a.value == this.pageConfigType.AO)[0].isActive;// 1 alpha-numeric, 2 numeric, 3 alphabetic
      this.challengeKeyModel.isNumericOnly = configList.filter(a => a.value == this.pageConfigType.NO)[0].isActive;// 1 alpha-numeric, 2 numeric, 3 alphabetic
    } catch (e) {
      throw e;
    }
  }

  preparePasswordRulesConfig(configList: any) {
    try {
      this.passwordRuleModel.isEnablePasswordRule = configList.filter(a => a.value == this.pageConfigType.EPR)[0].isActive;
      this.passwordRuleModel.isMixLetterAndNumber = configList.filter(a => a.value == this.pageConfigType.MCAMOLAN)[0].isActive;
      this.passwordRuleModel.isMustContainSpecialCharacter = configList.filter(a => a.value == this.pageConfigType.MCSC)[0].isActive;
      this.passwordRuleModel.isMustContainUpperAndLower = configList.filter(a => a.value == this.pageConfigType.MCULCC)[0].isActive;
      this.passwordRuleModel.passwordLength = Number(configList.filter(a => a.value == this.pageConfigType.PL)[0].pageConfigValue || 0);
      this.passwordRuleModel.passwordNote = configList.filter(a => a.value == this.pageConfigType.PN)[0].pageConfigValue;
      this.passwordRuleModel.passwordExpiryPeriod = configList.filter(a => a.value == this.pageConfigType.PEP)[0].pageConfigValue;
    } catch (e) {
      throw e;
    }
  }

  prepareOTPConfig(configList: any) {
    try {
      this.confirmOTPModel.oTPResendDuration = Number(configList.filter(a => a.value == this.pageConfigType.ORD)[0].pageConfigValue || 0);
      this.confirmOTPModel.otpLength = Number(configList.filter(a => a.value == this.pageConfigType.OL)[0].pageConfigValue || 0);
    } catch (e) {
      throw e;
    }
  }

  prepareCustomerLoginConfig(configList: any) {
    try {
      this.customerLoginConfigModel.isLoginWithOTP = configList.filter(a => a.value == this.pageConfigType.LWOTP)[0].isActive || false;
      this.customerLoginConfigModel.isLoginWithPassword = configList.filter(a => a.value == this.pageConfigType.LWPassword)[0].isActive || false;
      this.customerLoginConfigModel.isLoginWithGoogle = configList.filter(a => a.value == this.pageConfigType.LWGmail)[0].isActive || false;
      this.customerLoginConfigModel.isLoginWithFB = configList.filter(a => a.value == this.pageConfigType.LWFacebook)[0].isActive || false;
    } catch (e) {
      throw e;
    }
  }

  prepareOTPModel(userOTPID: number, mobileNo: string, email: string, navigateUrl: string) {
    try {
      this.confirmOTPModel.userOTPID = userOTPID;
      this.confirmOTPModel.mobileNo = mobileNo;
      this.confirmOTPModel.email = email;
      this.confirmOTPModel.navigateUrl = navigateUrl;
      // this.configSvc.setLocalStorage('oTPModel', this.confirmOTPModel);
    } catch (e) {
      throw e;
    }
  }

  prepareForgotPasswordConfig(configList: any) {
    try {
      this.forgotPasswordModel.isSMSCode = configList.filter(a => a.value == this.pageConfigType.VSC)[0].isActive;
      this.forgotPasswordModel.isEmailCode = configList.filter(a => a.value == this.pageConfigType.VEC)[0].isActive;
    } catch (e) {
      throw e;
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || !this.passwordRuleModel.isEnablePasswordRule) {
        return null;
      }

      if (this.passwordRuleModel.isMustContainUpperAndLower) {
        const hasUpperAndLowerCase = /(?=.*?[A-Z])(?=.*?[a-z])+/.test(value);
        if (!hasUpperAndLowerCase) return { Password: { message: "The password must include upper and lower case characters." } };
      }

      if (this.passwordRuleModel.isMustContainSpecialCharacter) {
        const hasSpecialCharacter = /[!@#\$%\^\&*\)\(+=._-]+/.test(value);
        if (!hasSpecialCharacter) return { Password: { message: "The password must be at least one special character." } };
      }

      if (this.passwordRuleModel.isMixLetterAndNumber) {
        const hasMixLetterAndNumber = /(?=.*?[A-Za-z])(?=.*?[0-9])+/.test(value);
        if (!hasMixLetterAndNumber) return { Password: { message: "The password must include at least one letter and one number." } };
      }

      if (this.passwordRuleModel.passwordLength) {
        if (value.length < this.passwordRuleModel.passwordLength) return { Password: { message: "The password must be at least (" + this.passwordRuleModel.passwordLength + ") character." } };
      }

      return null;
    };
  }

  setChallengeKey() {
    try {
      this.challengeKeyModel.generatedChallangeKey = this.generateChallangeKey(this.challengeKeyModel);
      this.challengeKeyModel.challengeKey = null;
    } catch (e) {
      throw e;
    }
  }

}




