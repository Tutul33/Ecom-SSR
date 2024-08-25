import { APP_INITIALIZER, FactoryProvider, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AdminService, FixedIDs, GlobalConstants, SalesService } from '../index';
import { lastValueFrom } from 'rxjs';
import { SalesConfig } from 'src/app/sales/config';
import { Loader } from '@googlemaps/js-api-loader';
import { GeneralSetupConfig } from '../../general-setup/general-setup-config';

declare let FB: any;

function loadThirdPartyApiKey(adminSvc: AdminService, platformId: object) {
  return async (): Promise<void> => {
    if (isPlatformBrowser(platformId)) {
      const module = GlobalConstants.ERP_MODULES.GS.name;
      const pageCd = GeneralSetupConfig.gsPageConfig.ThirdPartyAPIConfiguration;

      const res: any = await lastValueFrom(adminSvc.getModuleWisePageConfig(module, pageCd));
      if (res) {
        // google api key
        const googleAPKY = res.find(x => x.value == FixedIDs.pageConfigType.GoogleAPKY).pageConfigValue;
        GlobalConstants.isGoogleMapEnable = true;
        GlobalConstants.googleApiKey = googleAPKY;

        const loader = new Loader({
          apiKey: GlobalConstants.googleApiKey,
          version: "weekly",
          libraries: ["places"],
        });

        loader.importLibrary('maps');

        // google client id
        const googleClientID = res.find(x => x.value == FixedIDs.pageConfigType.GoogleCID);
        if (googleClientID) {
          GlobalConstants.googleClientId = googleClientID.pageConfigValue;
        }

        // facebook app id
        const fbAppID = res.find(x => x.value == FixedIDs.pageConfigType.FBAPPID);
        if (fbAppID) {
          GlobalConstants.fbAppID = fbAppID.pageConfigValue;
          loadScript(
            'FACEBOOK',
            `//connect.facebook.net/en_US/sdk.js`,
            () => {
              FB.init({
                appId: GlobalConstants.fbAppID,
                autoLogAppEvents: true,
                cookie: true,
                xfbml: true,
                version: 'v10.0',
              });
            });
        }
      }
    }
  };
}

export const setThirdPartyApiKey: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadThirdPartyApiKey,
  deps: [AdminService, PLATFORM_ID],
  multi: true,
};

function getDutyConfig(adminSvc: AdminService) {
  return async (): Promise<void> => {
    const res: any = await lastValueFrom(adminSvc.getDutyConfig());
    GlobalConstants.companyInfo.isDutyInclude = res || false;
  };
}
export const loadDutyConfig: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: getDutyConfig,
  deps: [AdminService],
  multi: true,
};

function getDutyFormulaDetail(adminSvc: AdminService) {
  return async (): Promise<void> => {
    const res: any = await lastValueFrom(adminSvc.getDutyFormulaDetail());
    GlobalConstants.dutyFormulaDetail = res;
    GlobalConstants.dutyFormulaDetail.forEach(element => {
      switch (element.dutyCd) {
        case 'VAT':
          GlobalConstants.companyInfo.isVatApplicable = true;
          break;
        case 'SD':
          GlobalConstants.companyInfo.isSDApplicable = true;
          break;
        default:
          break;
      }
    });
  };
}
export const loadDutyFormulaDetail: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: getDutyFormulaDetail,
  deps: [AdminService],
  multi: true,
};

function getEComPageConfig(slsSvc: SalesService) {
  return async (): Promise<void> => {
    const data: any = await lastValueFrom(slsSvc.getEComPageConfig());
    if (data.length > 0) {
      data.forEach(element => {
        switch (element.pageCd) {
          case FixedIDs.ecomPageCd.eComHomePageConfig: // home page 
            switch (element.categoryCd) {
              case FixedIDs.categoryCd.TB:
                switch (element.attribute) {
                  case FixedIDs.attributes.VT:
                    GlobalConstants.ecomHomePageConfigModel.tBVisibilityType = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isTopBannerEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.CAT:
                switch (element.attribute) {
                  case FixedIDs.attributes.VT:
                    GlobalConstants.ecomHomePageConfigModel.catVisibilityType = element.value;
                    break;
                  case FixedIDs.attributes.SA:
                    GlobalConstants.ecomHomePageConfigModel.catShowAs = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isCategoriesEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.MB01:
                switch (element.attribute) {
                  case FixedIDs.attributes.VT:
                    GlobalConstants.ecomHomePageConfigModel.mB01VisibilityType = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isMB01Enable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.TSD:
                GlobalConstants.ecomHomePageConfigModel.isTSDEnable = element.isActive;
                break;
              case FixedIDs.categoryCd.MB02:
                switch (element.attribute) {
                  case FixedIDs.attributes.VT:
                    GlobalConstants.ecomHomePageConfigModel.mB02VisibilityType = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isMB02Enable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.AOS:
                GlobalConstants.ecomHomePageConfigModel.isAOSEnable = element.isActive;
                break;
              case FixedIDs.categoryCd.MB03:
                switch (element.attribute) {
                  case FixedIDs.attributes.VT:
                    GlobalConstants.ecomHomePageConfigModel.mB03VisibilityType = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isMB03Enable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.BSI:
                switch (element.attribute) {
                  case FixedIDs.attributes.MNOIWBS:
                    GlobalConstants.ecomHomePageConfigModel.bsiMNOIWS = element.value;
                    break;
                  case FixedIDs.attributes.MNODTBC:
                    GlobalConstants.ecomHomePageConfigModel.bsiMNODC = element.value;
                    break;
                  case FixedIDs.attributes.COIWS:
                    GlobalConstants.ecomHomePageConfigModel.bsiCategorys = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isBSIEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.MB04:
                switch (element.attribute) {
                  case FixedIDs.attributes.VT:
                    GlobalConstants.ecomHomePageConfigModel.mB04VisibilityType = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isMB04Enable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.AI:
                switch (element.attribute) {
                  case FixedIDs.attributes.COIWS:
                    GlobalConstants.ecomHomePageConfigModel.aICategorys = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isAIEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.BB:
                switch (element.attribute) {
                  case FixedIDs.attributes.VT:
                    GlobalConstants.ecomHomePageConfigModel.bBVisibilityType = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomHomePageConfigModel.isBBEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              default:
                break;
            }
            break;
          case FixedIDs.ecomPageCd.eComFooterSetup: // footer setup
            switch (element.categoryCd) {
              case FixedIDs.categoryCd.FQL:
                if(element.title)
                {
                  GlobalConstants.ecomFooterConfigModel.footerQuickLinkList.push(element);
                }
                else{
                  GlobalConstants.ecomFooterConfigModel.isFQLEnable = element.isActive;
                }
                break;
              case FixedIDs.categoryCd.FSI:
                if(element.title)
                {
                  GlobalConstants.ecomFooterConfigModel.footerSocialIconList.push(element);
                }
                else{
                  GlobalConstants.ecomFooterConfigModel.isFSIEnable = element.isActive;
                }
                break;
              case FixedIDs.categoryCd.MAL:
                switch (element.attribute) {
                  case FixedIDs.attributes.GPL:
                    GlobalConstants.ecomFooterConfigModel.googlePlayLink = element.value;
                    break;
                  case FixedIDs.attributes.ASL:
                    GlobalConstants.ecomFooterConfigModel.appStoreLink = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomFooterConfigModel.isMALEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.BI:
                switch (element.attribute) {
                  case FixedIDs.attributes.BL:
                    GlobalConstants.ecomFooterConfigModel.brandLogoID = element.id;
                    break;
                  case FixedIDs.attributes.IT:
                    GlobalConstants.ecomFooterConfigModel.introText = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomFooterConfigModel.isBIEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              case FixedIDs.categoryCd.CI:
                switch (element.attribute) {
                  case FixedIDs.attributes.CT:
                    GlobalConstants.ecomFooterConfigModel.copyRightText = element.value;
                    break;
                  case null:
                    GlobalConstants.ecomFooterConfigModel.isCIEnable = element.isActive;
                    break;
                  default:
                    break;
                }
                break;
              default:
                break;
            }
            break;
          case FixedIDs.ecomPageCd.eComMainMenuSetup: // main menu setup
            switch (element.categoryCd) {
              case FixedIDs.categoryCd.MML:
                if(element.title)
                {
                  GlobalConstants.ecomMainMenuConfigModel.mainMenuLinkList.push(element);
                }
                else{
                  GlobalConstants.ecomMainMenuConfigModel.isMMLEnable = element.isActive;
                }
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      });
    }
  };
}
export const loadEComPageConfig: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: getEComPageConfig,
  deps: [SalesService],
  multi: true,
};

function getDeliveryCharge(adminSvc: AdminService) {
  try {
    let moduleName = GlobalConstants.ERP_MODULES.SLS.name;
    let pageCode = SalesConfig.salesPageConfig.MinimumDeliverycharge;
    return async (): Promise<void> => {
      const res: any = await lastValueFrom(adminSvc.getModuleWisePageConfig(moduleName, pageCode));
      if (res.length > 0) {
        GlobalConstants.companyInfo.deliveryCharge = Number(res[0].pageConfigValue) || 0;
      }
    };
  } catch (e) {
    this.showErrorMsg(e);
  }
}
export const loadDeliveryCharge: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: getDeliveryCharge,
  deps: [AdminService],
  multi: true,
};


function getBaseCurrency(adminSvc: AdminService) {
  return async (): Promise<void> => {
    const res: any = await lastValueFrom(adminSvc.getBaseCurrency());
    if (res) {
      GlobalConstants.companyInfo.currency = res.currency || '';
      GlobalConstants.companyInfo.currencyID = res.currencyID || '';
    }
  };
}
export const loadBaseCurrency: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: getBaseCurrency,
  deps: [AdminService],
  multi: true,
};

function loadScript(
  id: string,
  src: string,
  onload: any,
  parentElement = null
): void {
  // Ensure this only runs in the browser
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    let signInJS = document.createElement('script');

    signInJS.async = true;
    signInJS.src = src;
    signInJS.onload = onload;

    if (!parentElement) {
      parentElement = document.head;
    }
    parentElement.appendChild(signInJS);
  }
}