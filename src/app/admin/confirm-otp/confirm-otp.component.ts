import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from "@angular/core";
import { UntypedFormGroup, NgForm } from "@angular/forms";
import {
  ProviderService,
  BaseComponent,
  ValidatorDirective,
  ModalService,
  OTPService,
  OTPModelService,
  DynamicDialogRef,
  OTPModel,
  oTPValidation,
} from "../index";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-verify-otp",
  templateUrl: "./confirm-otp.component.html",
  providers: [OTPService, OTPModelService, ModalService],
})
export class ConfirmOtpComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("oTPForm", { static: true, read: NgForm }) oTPForm: NgForm;
  public validationMsgObj: any;
  isModal: boolean = false;
  ref: DynamicDialogRef;
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: OTPModelService,
    private dataSvc: OTPService,
    public modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(providerSvc);
    this.validationMsgObj = oTPValidation();
  }

  ngOnInit(): void {
    try {
      this.modalService.setHeader("");
      this.modalService.setClass("leftmodal");

      this.modelSvc.oTPModel = new OTPModel();
      if (this.modalService.modalData?.otpModel) {
        this.modelSvc.oTPModel = new OTPModel(
          this.modalService.modalData.otpModel
        );
        this.setCountingTime(this.modelSvc.oTPModel.oTPResendDuration);
        this.modelSvc.oTPModel.otpLengthArray = [];
        if (this.modelSvc.oTPModel.otpLength > 0) {
          for (
            let index = 0;
            index < this.modelSvc.oTPModel.otpLength;
            index++
          ) {
            this.modelSvc.oTPModel.otpLengthArray.push({
              otpValue: null,
            });
          }
        }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  ngAfterViewInit(): void {
    this.modelSvc.oTPForm = this.oTPForm.form;
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
      var otpInput = document.getElementById("otp_" + 0);
      otpInput.focus();
      }
    }, 50);
  }

  onSubmit(formGroup: NgForm) {
    try {
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(
          formGroup.form as UntypedFormGroup
        );
        return;
      }

      if (this.modelSvc.oTPModel.otpLengthArray.length > 0) {
        this.modelSvc.oTPModel.oTP = this.modelSvc.oTPModel.otpLengthArray
          .map((m) => m.otpValue)
          .join("");
      }

      if (!this.modelSvc.oTPModel.isTCChecked) {
        return;
      }

      this.confirmOTP(this.modelSvc.oTPModel);
    } catch (ex) {
      this.showErrorMsg(ex);
    }
  }

  sendOTP(mobileNo: string, email: string) {
    try {
      this.modelSvc.isSubmitted = true;
      this.dataSvc.sendOTP(mobileNo, email).subscribe({
        next: (res: any) => {
          if (res.body) {
            this.modelSvc.oTPModel.userOTPID = res.body;
            this.setCountingTime(this.modelSvc.oTPModel.oTPResendDuration);
          } else {
            this.showErrorMsg("2059");
          }
          this.modelSvc.isSubmitted = false;
        },
        error: (err: any) => {
          this.showErrorMsg(err);
          this.modelSvc.isSubmitted = false;
        },
        complete: () => {
          this.modelSvc.isSubmitted = false;
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  resendOTP() {
    try {
      this.modelSvc.oTPModel.otpLengthArray.forEach((element) => {
        element.otpValue = null;
      });
      if (isPlatformBrowser(this.platformId)) {
      var otpInput = document.getElementById("otp_0");
      otpInput.focus();
      this.sendOTP(
        this.modelSvc.oTPModel.mobileNo,
        this.modelSvc.oTPModel.email
      );
    }
    } catch (e) {
      throw e;
    }
  }

  setCountingTime(resendDuration: number) {
    try {
      this.modelSvc.oTPModel.isTimeCount = true;
      this.modelSvc.oTPModel.countingTime = resendDuration;
      clearInterval(this.modelSvc.interval);
      this.modelSvc.interval = setInterval(() => {
        if (this.modelSvc.oTPModel.countingTime > 0) {
          this.modelSvc.oTPModel.countingTime =
            this.modelSvc.oTPModel.countingTime - 1;
        } else {
          this.modelSvc.oTPModel.isTimeCount = false;
          clearInterval(this.modelSvc.interval);
        }
      }, 1000);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  confirmOTP(oTPModel: OTPModel) {
    try {
      this.modelSvc.isSubmitted = false;
      this.dataSvc.confirmOTP(oTPModel.userOTPID, oTPModel.oTP).subscribe({
        next: (res: any) => {
          if (res.body) {
            this.modelSvc.oTPModel.isOTPConfirmed = true;
            this.closeModal();
          } else {
            this.showMsg("2058");
          }
          this.modelSvc.isSubmitted = false;
        },
        error: (err: any) => {
          this.showErrorMsg(err);
          this.modelSvc.isSubmitted = false;
        },
        complete: () => {
          this.modelSvc.isSubmitted = false;
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  closeModal() {
    if (this.modalService.isModal) {
      this.modalService.close(this.modelSvc.oTPModel);
    }
  }

  onEnterFunction(event, formGroup: NgForm) {
    if (event.keyCode === 13) {
      if (formGroup.dirty) this.onSubmit(formGroup);
    }
  }

  focusNext(otpValue, i) {
    try {
      if (otpValue) {
        if (isPlatformBrowser(this.platformId)) {
        var otpInput = document.getElementById("otp_" + i);
        if(otpInput != null)
        {
          otpInput.focus();
        }
      }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  onClickChangeMobileNo() {
    try {
      this.closeModal();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onPaste(event:any){
    try {
      event.preventDefault();
      let pasteData = event.clipboardData.getData('text/plain');

      if(pasteData)
      {
        let otpCharList = pasteData.split('');
        for (let index = 0; index < otpCharList.length; index++) {
          const otpChar = otpCharList[index];
          let otpInput = this.modelSvc.oTPModel.otpLengthArray[index];
          otpInput.otpValue = otpChar;
        }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

}
