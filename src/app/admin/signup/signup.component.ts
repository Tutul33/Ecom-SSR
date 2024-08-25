import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticateModel, CustomerDTO, CustomerSocialMediaLogIn, SignUpInModel, signUpInValidation } from '../models/sign-up-in.model';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
declare let FB: any;
import {
  ProviderService,
  BaseComponent,
  ValidatorDirective,
  SignUpInDataService,
  SignUpInModelService,
  ModalConfig,
  ConfirmOtpComponent,
  DynamicDialogRef,
  ForgotpasswordComponent,
  ModalService,
  GlobalMethods,
  OTPService,
  GlobalConstants,
  AdminService,
  FixedIDs,
  MobileNoModalComponent
} from '../index';
import { EComConfig } from 'src/app/ecm/config';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [SignUpInDataService, SignUpInModelService, OTPService, ModalService]
})
export class SignupComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("signUpInForm", { static: true, read: NgForm }) ngForm: NgForm;
  signUpInForm: UntypedFormGroup;
  public validationMsgObj: any;
  formNo: number = 1; //  1 = otp, 2 = password, 3 = sign up by password 
  signUpInMode: number = 1; // 1 = otp, 2 = password
  ref: DynamicDialogRef;
  private requestOptions = {
    scope: 'email,public_profile',
    locale: 'en_US',
    fields: 'name,email,picture,first_name,last_name',
    version: 'v20.0',
  };
  constructor(
    protected providerSvc: ProviderService,
    private dataSvc: SignUpInDataService,
    public modelSvc: SignUpInModelService,
    private adminSvc: AdminService,
    private optSvc: OTPService,
    public modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    super(providerSvc);
    this.validationMsgObj = signUpInValidation();
  }

  ngOnInit(): void {
    try {
      this.modalService.setHeader('');
      this.modalService.setClass('leftmodal');

      //if already sign in redirect to home page
      if (GlobalConstants.customerInfo.id > 0) {
        this.router.navigateByUrl('/home');
      }
      this.setDefaultData();

    // //@ts-ignore
    // window.fbAsyncInit = function() {
    // //@ts-ignore
    //   FB.init({
    //     appId      : '561602290896109',
    //     cookie     : true,  // enable cookies to allow the server to access 
    //     xfbml      : true,  // parse social plugins on this page
    //     version    : 'v10.0' // Specify the Graph API version to use
    //   });
    // }
    // this.loadScript(
    //   'FACEBOOK',
    //   `//connect.facebook.net/en_US/sdk.js`,
    //   () => {
    //     FB.init({
    //       appId: GlobalConstants.facebookLoginApiKey,
    //       autoLogAppEvents: true,
    //       cookie: true,
    //       xfbml: true,
    //       version: this.requestOptions.version,
    //     });
    //   });
       
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  // protected loadScript(
  //   id: string,
  //   src: string,
  //   onload: any,
  //   parentElement = null
  // ): void {
  //   // get document if platform is only browser
  //   if (typeof document !== 'undefined' && !document.getElementById(id)) {
  //     let signInJS = document.createElement('script');

  //     signInJS.async = true;
  //     signInJS.src = src;
  //     signInJS.onload = onload;

  //     if (!parentElement) {
  //       parentElement = document.head;
  //     }

  //     parentElement.appendChild(signInJS);
  //   }
  // }

  setDefaultData() {
    try {
      this.setGoogleClientID();
      this.modelSvc.setDefaultDataForSignUpIn();
      this.getChallengeKeyConfig();
      this.getPasswordRuleConfig();
      this.getOTPConfig();
      this.getCustomerLoginConfig();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  setGoogleClientID(){
    try {
      if(isPlatformBrowser(this.platformId))
       {
       //@ts-ignore
       google.accounts.id.initialize({
        client_id: GlobalConstants.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: false
      });
      //@ts-ignore
      google.accounts.id.renderButton(document.getElementById("googleBtn"), {
        theme:'filled_blue',
        size:'large',
        shape:'rectangular',
        width:350
      })
      //@ts-ignore
      google.accounts.id.prompt((notification:PromptMomentNotification) => {});
    }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
 

  ngAfterViewInit(): void {
    try {
      this.signUpInForm = this.ngForm.form;
      this.focus(this.signUpInForm, "mobileNo");
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getChallengeKeyConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.ChallengeKey).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareChallengeKeyConfig(res);
          this.modelSvc.setChallengeKey();
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getPasswordRuleConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.CustomerPasswordRules).subscribe({
        next: (res: any) => {
          this.modelSvc.preparePasswordRulesConfig(res);
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getOTPConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(this.modelSvc.moduleName, this.modelSvc.adminPageConfig.OTPConfiguration).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareOTPConfig(res);
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  getCustomerLoginConfig() {
    try {
      this.adminSvc.getModuleWisePageConfig(GlobalConstants.ERP_MODULES.ECM.name, EComConfig.ecomPageConfig.CustomerLoginOption).subscribe({
        next: (res: any) => {
          this.modelSvc.prepareCustomerLoginConfig(res);
          if(this.modelSvc.customerLoginConfigModel.isLoginWithOTP == false)
          {
            this.changeForm(2);
          }
        },
        error: (res: any) => { this.showErrorMsg(res); }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onSubmit(formGroup: NgForm) {
    try {
      this.modelSvc.isSubmitted = true;
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        this.modelSvc.isSubmitted = false;
        return;
      }

      let messageCode = this.modelSvc.checkSignUpInOnSubmit(this.formNo);
      if(messageCode)
      {
        this.showMsg(messageCode);
        return;
      }
     
      this.modelSvc.prepareCustomerModel(this.modelSvc.signUpInModel);
      if (this.formNo != 3) {
        //check mobile number is registered.
        if (this.formNo == 1) {
          this.sendOTP(this.modelSvc.customerModel.mobileNo);
        }
        this.checkRegisteredMobileOrEmail(this.modelSvc.customerModel.mobileNo);
      }
      else {
        if (this.modelSvc.signUpInModel.isRegisteredByPassord) {
          this.sigin(this.modelSvc.customerModel);
        }
        else {
          this.sendOTP(this.modelSvc.customerModel.mobileNo);
        }
      }
    } catch (ex) {
      this.showErrorMsg(ex);
    }
  }

  onSubmitMobileNo(formGroup: NgForm) {
    try {
      this.modelSvc.isSubmitted = true;
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        this.modelSvc.isSubmitted = false;
        return;
      }
      if (this.modelSvc.challengeKeyModel.isEnableChallengeKey) {
        if (this.modelSvc.socialLoginModel.challengeKey != this.modelSvc.challengeKeyModel.generatedChallangeKey) {
          this.modelSvc.setChallengeKey();
          this.modelSvc.isSubmitted = false;
          this.showMsg('2061');
          return;
        }
      }
      this.modelSvc.prepareCustomerModel(this.modelSvc.socialLoginModel);
      this.modelSvc.customerModel.customerPassword = null;
      this.saveData(this.modelSvc.customerModel);
    } catch (ex) {
      this.showErrorMsg(ex);
    }
  }

  checkRegisteredMobileOrEmail(mobileNo: string) {
    try {
      this.modelSvc.isSubmitted = true;
      this.modelSvc.signUpInModel.isRegisteredByPassord = false;
      this.dataSvc.getCustomerByMobileOrEmail(mobileNo, null, true).subscribe({
        next: (res: any) => {
          if (res.body) {
            if (res.body.password) {
              this.modelSvc.signUpInModel.isRegisteredByPassord = true;
            }
            this.modelSvc.customerModel.id = res.body.id;
          }
          if (this.formNo == 2) {
            this.formNo = 3;
            this.modelSvc.isSubmitted = false;
            this.focus(this.signUpInForm, "password");

            if (this.modelSvc.signUpInModel.isRegisteredByPassord) {
              this.setRequiredValidation('password');
              let cookiePassword = GlobalMethods.getCookie(mobileNo);
              if (cookiePassword) {
                this.modelSvc.signUpInModel.password = cookiePassword;
                this.modelSvc.signUpInModel.isRememberPassword = true;
              }
            }
            else {
              this.setPasswordValidation();
              this.setRequiredValidation('reEnterPassword');
            }
          }
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
          this.modelSvc.setChallengeKey();
        }
      });
    } catch (e) {
      this.showMsg(e);
    }
  }

  saveData(customer: CustomerDTO) {
    try {
      this.modelSvc.isSubmitted = true;
      this.dataSvc.save(customer).subscribe({
        next: (res: any) => {
          this.modelSvc.setCustomerInformation(res.body);
          if (this.modelSvc.signUpInModel.isRememberPassword) {
            GlobalMethods.setCookie(customer.mobileNo, customer.customerPassword, 7);
          }
          else {
            GlobalMethods.setCookie(customer.mobileNo, customer.customerPassword, 0);
          }

          this.getMemberDetailByID(res.body.id);
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
        },
        complete: () => {
          this.modelSvc.isSubmitted = false;
        }
      });
    } catch (e) {
      this.showMsg(e);
    }
  }

  sigin(customer: CustomerDTO) {
    try {
      this.modelSvc.isSubmitted = true;
      let authenticateModel = new AuthenticateModel();
      authenticateModel.userName = customer.mobileNo;
      authenticateModel.password = customer.customerPassword;
      this.dataSvc.signIn(authenticateModel).subscribe({
        next: (res: any) => {
          if (res.body) {
            if (res.body.responseSuccess) {
              if (this.modelSvc.signUpInModel.isRememberPassword) {
                GlobalMethods.setCookie(customer.mobileNo, customer.customerPassword, 7);
              }
              else {
                GlobalMethods.setCookie(customer.mobileNo, customer.customerPassword, 0);
              }
              this.modelSvc.setCustomerInformation(res.body);
              this.getMemberDetailByID(res.body.id);
            }
            else {
              this.showMsg('2062');
              this.modelSvc.setChallengeKey();
            }
          }
          else {
            this.showMsg('2062');
            this.modelSvc.setChallengeKey();
          }
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
        },
        complete: () => {
          this.modelSvc.isSubmitted = false;
        }
      });
    } catch (e) {
      this.showMsg(e);
    }
  }

  sendOTP(mobileNo: string) {
    try {
      this.modelSvc.isSubmitted = true;
      this.optSvc.sendOTP(mobileNo, null).subscribe({
        next: (res: any) => {
          if (res.body) {
            this.showConfirmOtpModal(res.body, mobileNo);
          }
          else {
            this.showMsg('2059');
            this.modelSvc.setChallengeKey();
          }
        },
        error: (err: any) => {
          this.showErrorMsg(err);
          this.modelSvc.isSubmitted = false;
          this.modelSvc.setChallengeKey();
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showConfirmOtpModal(userOTPID: number, mobileNo: string) {
    try {
      this.modelSvc.prepareOTPModel(userOTPID, mobileNo, null, 'signup');
      const modalConfig = new ModalConfig();
      modalConfig.position = FixedIDs.modalPosition.left;
      modalConfig.height = '100%';
     
      modalConfig.data = {
        otpModel: this.modelSvc.confirmOTPModel
      }

      this.ref = this.dialogSvc.open(ConfirmOtpComponent, modalConfig);
      this.ref.onClose.subscribe((obj: any) => {
        if (obj) {
          if (obj.isOTPConfirmed) {
            if (this.modelSvc.customerModel.id > 0 && this.formNo == 1) {
              this.sigin(this.modelSvc.customerModel);
            }
            else {
              this.saveData(this.modelSvc.customerModel);
            }
          }
          else {
            this.formNo = 0;
            if (this.signUpInMode == 1) {
              this.changeForm(1);
            }
            else {
              this.changeForm(2);
            }
            this.modelSvc.isSubmitted = false;
          }
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  showForgotPasswordModal() {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.position = FixedIDs.modalPosition.left;
      modalConfig.height = '100%';
      modalConfig.data = {
        mobileNo: this.modelSvc.customerModel.mobileNo
      }

      this.ref = this.dialogSvc.open(ForgotpasswordComponent, modalConfig);
      this.closeModal();

    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  changeForm(formNo: number) {
    try {
      if (formNo != this.formNo) {
        let prevFormNo = GlobalMethods.jsonDeepCopy(this.formNo);
        this.formNo = formNo;
        this.signUpInMode = formNo;
        this.modelSvc.signUpInModel = new SignUpInModel();
        this.modelSvc.challengeKeyModel.challengeKey = null;
        this.signUpInForm.reset(this.modelSvc.signUpInModel);
        this.modelSvc.setChallengeKey();
        this.focus(this.signUpInForm, "mobileNo");
        if (prevFormNo == 3) {
          this.setMobileNoValidation();
          if (this.modelSvc.challengeKeyModel.isEnableChallengeKey) {
            this.setRequiredValidation('challengeKey');
          }
        }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  setMobileNoValidation() {
    try {
      setTimeout(() => {
        const ctrl = this.signUpInForm.controls["mobileNo"];
        let validatorList = [];
        validatorList.push(Validators.required);
        validatorList.push(Validators.maxLength(14));
        validatorList.push(Validators.pattern('(^(\\+88)?(01){1}[3456789]{1}(\\d){8})$'));
        ctrl.setValidators(validatorList);
        ctrl.updateValueAndValidity();
      });
    } catch (e) {
      throw e;
    }
  }
  setPasswordValidation() {
    try {
      setTimeout(() => {
        const ctrl = this.signUpInForm.controls["password"];
        let validatorList = [];
        validatorList.push(Validators.required);
        validatorList.push(Validators.maxLength(16));
        validatorList.push(this.modelSvc.passwordValidator());
        ctrl.setValidators(validatorList);
        ctrl.updateValueAndValidity();
      });
    } catch (e) {
      throw e;
    }
  }
  setRequiredValidation(fieldName: string) {
    try {
      setTimeout(() => {
        const ctrl = this.signUpInForm.controls[fieldName];
        ctrl.setValidators(Validators.required);
        ctrl.updateValueAndValidity();
      });
    } catch (e) {
      throw e;
    }
  }

  onPastePreventDefault(event: ClipboardEvent) {
    event.preventDefault();
  }

  onEnterFunction(event, formGroup: NgForm) {
    if (event.keyCode === 13) {
      if (formGroup.dirty) this.onSubmit(formGroup);
    }
  }

  onMobileFormEnterFunction(event, formGroup: NgForm) {
    if (event.keyCode === 13) {
      if (formGroup.dirty) this.onSubmitMobileNo(formGroup);
    }
  }

  closeModal() {
    if (this.modalService.isModal) {
      this.modalService.close();
    }
  }

  getMemberDetailByID(id: number) {
    try {
        this.dataSvc.getMemberDetailByID(id).subscribe({
            next: (res: any) => {
                if (res.length > 0) {
                  this.modelSvc.setMemberInfo(res[0]);
                }

                if(isPlatformBrowser(this.platformId))
                  window.location.reload();
            },
            error: (err: any) => {
                this.showErrorMsg(err);
            },
            complete: () => {
            },
        });
    } catch (e) {
        this.showErrorMsg(e);
    }
  }
  signInWithGoogle(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => 
    //   // console.log(x)
    //   this.modelSvc.isOpenMobileNoModal = true
    // );
  }

 async signInWithFB() {
    try {
      FB.login((response: any) => {
        if (response.authResponse) {
          let authResponse = response.authResponse;
          FB.api(`/me?fields=${this.requestOptions.fields}`, (fbUser: any) => {
            let user:any = {};

            user.id = fbUser.id;
            user.name = fbUser.name;
            user.email = fbUser.email;
            user.photoUrl =
              'https://graph.facebook.com/' +
              fbUser.id +
              '/picture?type=normal';
            user.firstName = fbUser.first_name;
            user.lastName = fbUser.last_name;
            user.authToken = authResponse.accessToken;

            user.response = fbUser;
          });
        } else {
          this.showErrorMsg('User cancelled login or did not fully authorize.');
        }
      }, this.requestOptions);
    } catch (e) {
      this.showErrorMsg(e);
    }

    // this.modelSvc.socialLoginModel = new SignUpInModel();
    // this.modelSvc.isOpenMobileNoModal = true
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => 
    //   this.modelSvc.isOpenMobileNoModal = true
    // );
  }
  
  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  async handleCredentialResponse(response:CredentialResponse){
    try {
      let credential:any = {};
      credential = GlobalMethods.parseJwt(response.credential);
      this.modelSvc.socialLoginModel = new SignUpInModel();
      this.modelSvc.socialLoginModel.email = credential.email;
      this.modelSvc.socialLoginModel.name = credential.name;

      this.modelSvc.customerSocialMediaLogIn = new CustomerSocialMediaLogIn();
      this.modelSvc.customerSocialMediaLogIn.accountID = credential.email;
      this.modelSvc.customerSocialMediaLogIn.uniqueID = credential.sub;
      this.modelSvc.customerSocialMediaLogIn.accountName = credential.name;
      this.getCustMobileBySocialAccountID(this.modelSvc.customerSocialMediaLogIn.accountID);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getCustMobileBySocialAccountID(accountID:string) {
    try {
        this.dataSvc.getCustMobileBySocialAccountID(accountID).subscribe({
            next: (res: any) => {
                if (res) {
                  this.modelSvc.socialLoginModel.mobileNo = res.mobileNo;
                  this.modelSvc.prepareCustomerModel(this.modelSvc.socialLoginModel);
                  this.modelSvc.customerModel.customerSocialMediaLogIn = null;
                  this.saveData(this.modelSvc.customerModel);
                }
                else{
                  this.showMobileNoModal();
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


  showMobileNoModal() {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.position = FixedIDs.modalPosition.left;
      modalConfig.height = '100%';
      modalConfig.data = {
        otpModel: this.modelSvc.confirmOTPModel
      }
      this.ref = this.dialogSvc.open(MobileNoModalComponent, modalConfig);
      this.ref.onClose.subscribe((mobileNo: any) => {
        if (mobileNo) {
          this.modelSvc.socialLoginModel.mobileNo = mobileNo;
          this.modelSvc.prepareCustomerModel(this.modelSvc.socialLoginModel);
          this.modelSvc.customerModel.customerSocialMediaLogIn = this.modelSvc.customerSocialMediaLogIn;
          this.saveData(this.modelSvc.customerModel);
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

}
