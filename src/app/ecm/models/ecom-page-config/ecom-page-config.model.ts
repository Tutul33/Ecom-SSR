
import { FixedIDs } from "src/app/app-shared";
import { GlobalConstants, ValidatingObjectFormat } from "src/app/app-shared/models/javascriptVariables";

export class EComPageConfigDTO {
  id: number = 0;
  pageCd: number = null;
  categoryCd: string = null;
  attribute: string = null;
  title: string = null;
  icon: string = null;
  value: string = null;
  isActive: boolean = true;

  //extra properties
  locationID: number = GlobalConstants.userInfo.locationID;
  constructor(defaultData?: Partial<EComPageConfigDTO>) {
    defaultData = defaultData || {};
    Object.keys(defaultData).forEach((key) => {
      const value = defaultData[key];
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
  }
}

export class EcomHomePageConfigModel {
  isTopBannerEnable: boolean = true;
  tBVisibilityType: number = FixedIDs.visibilityType.Slide;
  isCategoriesEnable: boolean = true;
  catVisibilityType: number = FixedIDs.visibilityType.Slide;
  catShowAs: number = FixedIDs.showAs.ImageAndName;
  isMB01Enable: boolean = true;
  mB01VisibilityType: number = FixedIDs.visibilityType.Slide;
  isTSDEnable: boolean = true;
  isMB02Enable: boolean = true;
  mB02VisibilityType: number = FixedIDs.visibilityType.Slide;
  isAOSEnable: boolean = true;
  isMB03Enable: boolean = true;
  mB03VisibilityType: number = FixedIDs.visibilityType.Slide;
  isBSIEnable: boolean = true;
  bsiMNOIWS: number = 10;
  bsiMNODC: number = 10;
  bsiCategorys: string = null;
  isMB04Enable: boolean = true;
  mB04VisibilityType: number = FixedIDs.visibilityType.Slide;
  isAIEnable: boolean = true;
  aIMNOIWS: number = 10;
  aICategorys: null;
  isBBEnable: boolean = true;
  bBVisibilityType: number = FixedIDs.visibilityType.Slide;
}
