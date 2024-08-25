import { AdminService, ChangePasswordComponent, ConfigService, FixedIDs } from 'src/app/admin';
import { ECommDataService, ECommModelService } from 'src/app/ecm';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { GlobalConstants } from '../../models/javascriptVariables';
import { FileUploadOption, ModalConfig } from 'src/app/shared/models/common.model';
import { ProviderService } from 'src/app/core/services/provider.service';
import { Config } from '../../models/config';
import { FieldTitleService } from 'src/app/core/services/field-title.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  providers: [ECommModelService, ECommDataService]
})
export class HeaderComponent extends BaseComponent implements OnInit {
  customerInfo: any = GlobalConstants.customerInfo;
  ecomMainMenuConfigModel: any = GlobalConstants.ecomMainMenuConfigModel;
  customerImageViewOption: FileUploadOption;
  ecomConfigImageViewOption: FileUploadOption;
  //Variable for Language start
  languageList: any = [];
  lgCode: string = "";
  //Variable for Language end
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    public dataSvc: ECommDataService,
    public adminSvc: AdminService,
    public fieldSvc: FieldTitleService,
    private configSvc: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      if (this.customerInfo.id > 0) {
        this.setFileViewOption();
        this.getMembershipBenefitList(this.customerInfo.id);
      }
      this.getLanguageList();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  redirectRoute(routeLink: string) {
    try {
      if (this.customerInfo.id > 0 || routeLink == "/food-menu") {
        this.router.navigate([routeLink]);
      } else {
        this.modelSvc.showSiginModal();
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  logOut() {
    try {
      this.modelSvc.setLocalStorage('customerInfo', null);
      this.modelSvc.membershipBenefitList = [];
      this.modelSvc.prepareOfferDiscount(this.modelSvc.orderDTO);
      this.modelSvc.calculateTotalPrice();
      if (isPlatformBrowser(this.platformId)) {
        this.router.navigate(["/home"]).then(() => {
          window.location.reload();
        });
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showChangePassword() {
    try {
      const modalConfig = new ModalConfig();
      modalConfig.position = FixedIDs.modalPosition.left;
      modalConfig.height = "100%";
      this.modelSvc.ref = this.dialogSvc.open(ChangePasswordComponent, modalConfig);
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  setFileViewOption() {
    try {
      this.customerImageViewOption = new FileUploadOption();
      this.customerImageViewOption.folderName = Config.imageFolders.user;
      this.ecomConfigImageViewOption = new FileUploadOption();
      this.ecomConfigImageViewOption.folderName =
        Config.imageFolders.ecomPageConfig;
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onClickCart(url: string) {
    try {
      if(this.modelSvc.orderDTO.orderItemList.length > 0)
      {
        this.router.navigateByUrl(url);
      }
      else{
        this.showMsg('2114');
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  navigateBySlug(slug: string) {
    try {
      if (isPlatformBrowser(this.platformId)) {
        if (slug) {
          if (slug.includes("http")) {
            window.open(slug);
          } else {
            this.router.navigate(["/ecom/" + slug]);
          }
        }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  //NEW CODE FOR LANGUAGE START
  getLanguageList() {
    try {
      this.adminSvc.getLanguageList().subscribe({
        next: (res: any) => {
          this.languageList = res || [];
          this.setUpLanguage();
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  private setUpLanguage() {
    try {
      let customerInfo = this.configSvc.getLocalStorage("customerInfo");
      if (customerInfo) {
        if (
          customerInfo.languageCode == "" ||
          customerInfo.languageCode == null
        ) {
          this.setDefaultLanguage();
        } else {
          this.lgCode = customerInfo.languageCode;
        }
        this.changeLanguage();
      } else {
        if (isPlatformBrowser(this.platformId)) {
          let setLang = localStorage.getItem("languageCd");
          if (setLang) {
            this.lgCode = setLang;
            GlobalConstants.defaultLanguageCode = setLang;
            this.getFieldDetailList();
          } else {
            this.setDefaultLanguage();
            localStorage.setItem("languageCd", this.lgCode);
            this.getFieldDetailList();
          }
        }
      }
    } catch (error) {
      this.showErrorMsg(error);
    }
  }

  private setDefaultLanguage() {
    let defaultLanguage = this.languageList.find((x) => x.isDefault == true);
    if (defaultLanguage != undefined) {
      this.lgCode = defaultLanguage.code;
      GlobalConstants.defaultLanguageCode = defaultLanguage.code;
    }
  }

  changeLanguage() {
    try {
      if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("languageCd");
      localStorage.setItem("languageCd", this.lgCode);
      let customerId=GlobalConstants.customerInfo.id;
      if (customerId) {
        this.adminSvc
          .UpdateUserLanguageByUserID(
            this.lgCode,
            GlobalConstants.customerInfo.id
          )
          .subscribe({
            next: (res: any) => {
              GlobalConstants.customerInfo.languageCode = this.lgCode;
              this.configSvc.setLocalStorage(
                "customerInfo",
                GlobalConstants.customerInfo
              );
              this.getFieldDetailList();
            },
          });
        }else{
          this.getFieldDetailList();
        }
      } else {
        this.getFieldDetailList();
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getFieldDetailList() {
    try {
      this.fieldSvc.getFieldDetail("").subscribe({
        next: (res: any) => {},
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  //NEW CODE FOR LANGUAGE END

  getMembershipBenefitList(memberID: number) {
    try {
      this.dataSvc.getMembershipBenefitList(memberID).subscribe({
        next: (res: any) => {
          this.modelSvc.membershipBenefitList = res[res.length - 1] || [];
          this.modelSvc.prepareOfferDiscount(this.modelSvc.orderDTO);
          this.modelSvc.calculateTotalPrice();
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
}
