//var ip = window.location.hostname;
export class GlobalConstants {

  static signalRConnection: any;

  static testServerIP = '192.168.11.6';
  static serverIP = (typeof window !== 'undefined'?window.location.hostname:'');
  static liveServerIP = (typeof window !== 'undefined'?window.location.hostname:'');
  static localIP = 'localhost';

  static localStorageKey = {
    lastActiveRouteForForceLogout: 'lastActiveRouteForForceLogout',
  };

  static domReadyCompleted = false;

  static menuList = [];

  static ERP_MODULES = {
    APP: { name: 'app', code: 0 },
    ADMIN: { name: 'ADMIN', code: 1 },
    HRM: { name: 'HR', code: 2 },
    GS: { name: 'GS', code: 3 },
    INV: { name: 'INV', code: 10 },
    ORG: { name: 'ORG', code: 11 },
    ITM: { name: 'ITM', code: 12 },
    RPT: { name: 'RPT', code: 13 },
    ECM: { name: 'ECOM', code: 14 },
    CR: { name: 'CR', code: 15 },
    SLS: { name: 'SLS', code: 16 },
    POS: { name: 'POS', code: 17 },
    DLV: { name: 'DLV', code: 18 },
    TBL: { name: 'TBL', code: 19 },
    MKT: { name: 'MKT', code: 20 }
  };

  // no cache when app is loaded
  static jsVersion = 'bust=v_00_00_' + new Date().getSeconds().toString();
  static htmlVersion = '?bust=v_00_00_' + new Date().getSeconds().toString();

  // version number set
  static adminVersionNumber = ''; // 1.0.0
  static gsVersionNumber = ''; // 1.0.0
  static hrmVersionNumber = ''; // 1.0.0
  static omVersionNumber = ''; // 1.0.0
  static mgpVersionNumber = ''; // 1.0.0
  static pmVersionNumber = ''; // 1.0.0
  static pdVersionNumber = ''; // 1.0.0
  static comVersionNumber = ''; // 1.0.0
  static orgVersionNumber = ''; // 1.0.0
  static itmVersionNumber = ''; // 1.0.0
  static mktVersionNumber = ''; // 1.0.0
  static crVersionNumber = ''; // 1.0.0
  static invVersionNumber = ''; // 1.0.0

  //Developers Environment
  static ERP_MODULES_URL = {
    adminLocalUrl: 'http://' + GlobalConstants.testServerIP + ':4010/api/',
    adminFileRemoteUrl: 'http://' + GlobalConstants.testServerIP + ':4010/',
    ecomLocalUrl: 'http://' + GlobalConstants.testServerIP + ':4010/api/',
    ecomReportFileUrl: 'http://' + GlobalConstants.testServerIP + ':4010/Report/PDF/',
    signalrurl: 'http://' + GlobalConstants.testServerIP + ':6030'
  };
 
  /*
  //Developer-Tester Environment
    static ERP_MODULES_URL = {
      // Admin Module
      adminLocalUrl: 'http://' + GlobalConstants.testServerIP + ':4010/api/',
      adminFileRemoteUrl: 'http://' + GlobalConstants.testServerIP + ':4010/',
      ecomLocalUrl: 'http://' + GlobalConstants.testServerIP + ':4010/api/',
      ecomReportFileUrl: 'http://' + GlobalConstants.testServerIP + ':4010/Report/PDF/',
      signalrurl: 'http://' + GlobalConstants.testServerIP + ':6030'
    };
 */

  /*
  //Testing site
    static ERP_MODULES_URL = {
      adminLocalUrl: 'http://' + GlobalConstants.testServerIP + ':5010/api/',
      adminFileRemoteUrl: 'http://' + GlobalConstants.testServerIP + ':5010/',
      ecomLocalUrl: 'http://' + GlobalConstants.testServerIP + ':5010/api/',
      ecomReportFileUrl: 'http://' + GlobalConstants.testServerIP + ':5010/Report/PDF/',
      signalrurl: 'http://' + GlobalConstants.testServerIP + ':6030'
    };  
 */

  static APP_IDLE_TIMEOUT_LIMIT = 60; // 30 MIN

  static pageInfo = {
    id: null,
    locationID: null,
    applicationID: null,
    parentID: null,
    moduleName: null,
    pageTitle: null,
    serialNo: null,
    pageType: null,
    imageName: null,
    uRL: null,
    isPageOrMenu: null,
    items: [],
    action: null,
    projectFileName: null,
    add: null,
    edit: null,
    delete: null,
    preview: null,
    print: null,
    cancel: null,
    standby: null,
    approve: null,
    editTime: null,
    deleteTime: null,
    breadcrumbs: []
  };

  static operationMode = {
    insert: 1,
    update: 2,
    revise: 3,
  };

  static serverDate = null;

  static skipRefreshTokenCheck = false;

  // after login succesfully, user information is stored into userInfo
  static userInfo = {
    locationID: 1,
    userPKID: null,
    empPKID: 0,
    employeeID: '',
    userID: 'nextit',
    userName: 'N/A',
    companyID: 0,
    company: '',
    password: '',
    userTypeID: 0,
    token: '',
    orgID: 100000019,
    empOrgID: 0,
    email: null,
    userUniqueNo: 0,
    rootOrgID: 0,
    rootOrgName: '',
    rootOrgElementCode: 0,
    rootOrgAddress: '',
    rootOrgMobile: '',
    languageCode:''
  };


  static customerInfo = {
    id: null,
    mobileNo: null,
    altMobileNo: null,
    email: null,
    name: null,
    dOB: null,
    genderCd: null,
    profilePicFileName: null,
    memberID: null,
    availablePoint: 0,
    memberType: null,
    validityPeriod: null,
    languageCode:null,
    totalOrd:0
  };

  static posCustWindow = null;

  static companyInfo = {
    companyID: 100000001,
    companyName: 'WinBees Restaurant and Cafe',
    companyNameCap: '',
    companyShortName: '',
    companySmallShortName: '',
    companyAddress: '552/C, RN Tower, Opposite of Taltola Market 1219 Dhaka, Dhaka Division, Bangladesh.',
    companyHeadOfficeAddress: '',
    regNo: '',
    companyName_B: 'উইনবীজ রেস্টুরেন্ট এন্ড ক্যাফে',
    companyAddress_B: '৫৫২/খিলগাঁও, ঢাকা-১২১৯',
    companyDistrict_B: '',
    companyCountry_B: 'বাংলাদেশ',
    companyCountry: 'Bangladesh',
    regNo_B: '',
    companyLogoUrl: GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + 'images/Permanent/Logo/company-report-logo.png',
    signatureUrl: GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + 'images/Permanent/Logo/Signature.jpg',
    companyQRCodeUrl: GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + 'images/Permanent/Logo/CompanyQRCode.jpg',
    creditControlAuthoritySignUrl: GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + 'images/Permanent/Logo/CreditControlAuthoritySign.jpg',
    inspectionAuthoritySignUrl: GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + 'images/Permanent/Logo/InspectionAuthoritySign.jpg',

    //For Live server IP Forwarding Issue
    //  companyLogoUrl:  'http://localhost/RestaurantMngSystemContent/images/Permanent/Logo/company-report-logo.png',
    // signatureUrl:  'http://localhost/RestaurantMngSystemContent/images/Permanent/Logo/Signature.jpg',
    //  companyQRCodeUrl:  'http://localhost/RestaurantMngSystemContent/images/Permanent/Logo/CompanyQRCode.jpg',
    // creditControlAuthoritySignUrl:  'http://localhost/RestaurantMngSystemContent/images/Permanent/Logo/CreditControlAuthoritySign.jpg',
    //  inspectionAuthoritySignUrl:  'http://localhost/RestaurantMngSystemContent/images/Permanent/Logo/InspectionAuthoritySign.jpg',


    companyContact: '',
    companyEmail: 'hello@winbees.com.bd',
    companyMobile: '',
    companyMobileBangla: '',
    companyMobileHotline: '',
    companyWebSiteAdd: 'www.winbees.com.bd',
    binNo: '003641363-0202',
    isDutyInclude: false,
    currencyID: 0,
    currency: 'BDT',
    mushak: '6.3',
    isVatApplicable: false,
    isSDApplicable: false,
    formulaGrpCd: null,
    deliveryCharge: 0
  };

  static commonElements = [];

  static directPrintConfig = {
    rptStream: '',
    pageLayout: 1,
    pageSize: 1,
    copies: '1',
    pageWidth: 0,
    pageHeight: 0,
    isDuplexPrint: false,
    printerName: '',
    fileName: '',
    filePath: ''
  };

  // Print Invoice Config 
  static printInvoiceConfig = {
    barCodeWidth: 200,
    barCodeHeight: 30,
    pageWidth: 3.0709,
    initialPageHeight: 8.2,
    perItemHeight: 0.4
  };

  static directPrintInvoiceConfig = {
    barCodeWidth: 200,
    barCodeHeight: 30,
    pageWidth: 3.0709,
    initialPageHeight: 11.2,
    initialPageHeightForToken: 11.2,
    perItemHeight: 0.4,
    initialHeightPerItem: 0.4
  };

  // Used to contain month list
  static months = [
    { code: 1, shortName: 'Jan', fullName: 'January', banglaName: 'জানুয়ারী' },
    { code: 2, shortName: 'Feb', fullName: 'February', banglaName: 'ফেব্রুয়ারি' },
    { code: 3, shortName: 'Mar', fullName: 'March', banglaName: 'মার্চ' },
    { code: 4, shortName: 'Apr', fullName: 'April', banglaName: 'এপ্রিল' },
    { code: 5, shortName: 'May', fullName: 'May', banglaName: 'মে' },
    { code: 6, shortName: 'Jun', fullName: 'June', banglaName: 'জুন' },
    { code: 7, shortName: 'Jul', fullName: 'July', banglaName: 'জুলাই' },
    { code: 8, shortName: 'Aug', fullName: 'August', banglaName: 'আগস্ট' },
    { code: 9, shortName: 'Sep', fullName: 'September', banglaName: 'সেপ্টেম্বর' },
    { code: 10, shortName: 'Oct', fullName: 'October', banglaName: 'অক্টোবর' },
    { code: 11, shortName: 'Nov', fullName: 'November', banglaName: 'নভেম্বর' },
    { code: 12, shortName: 'Dec', fullName: 'December', banglaName: 'ডিসেম্বর' },
  ];

  static days = [
    { code: 'FRI', shortName: 'F', fullName: 'Friday', day: 6 },
    { code: 'SAT', shortName: 'S', fullName: 'Saturday', day: 7 },
    { code: 'SUN', shortName: 'S', fullName: 'Sunday', day: 1 },
    { code: 'MON', shortName: 'M', fullName: 'Monday', day: 2 },
    { code: 'TUE', shortName: 'T', fullName: 'Tuesday', day: 3 },
    { code: 'WED', shortName: 'W', fullName: 'Wednesday', day: 4 },
    { code: 'THU', shortName: 'T', fullName: 'Thursday', day: 5 },
  ];

  static validationMsg: any = {};

  static shortft: any = {};
  static longft: any = {};
  static longfht: any = {};
  static fieldTitle: any = {};
  static isGoogleMapEnable: boolean = false;
  static googleApiKey:string = '';
  static googleClientId:string = '';
  //26250233959-ka20n671tfkbpi055the62jkup6heib6.apps.googleusercontent.com
  //798217017526-nmoevkao5l5ohrsvpv0f6vjpbibqvgmj.apps.googleusercontent.com
  static fbAppID:string = ''; 
  static defaultLanguageCode:string = '';

  static ecomHomePageConfigModel = {
    isTopBannerEnable: null,
    tBVisibilityType: null,
    isCategoriesEnable: null,
    catVisibilityType: null,
    catShowAs: null,
    isMB01Enable: null,
    mB01VisibilityType: null,
    isTSDEnable: null,
    isMB02Enable: null,
    mB02VisibilityType: null,
    isAOSEnable: null,
    isMB03Enable: null,
    mB03VisibilityType: null,
    isBSIEnable: null,
    bsiMNOIWS: null,
    bsiMNODC: null,
    bsiCategorys: null,
    isMB04Enable: null,
    mB04VisibilityType: null,
    isAIEnable: null,
    aICategorys: null,
    isBBEnable: null,
    bBVisibilityType: null,
  }

  static ecomFooterConfigModel = {
    isFQLEnable:null,
    footerQuickLinkList : [],
    isFSIEnable:null,
    footerSocialIconList: [],
    isMALEnable:null,
    googlePlayLink: null,
    appStoreLink:null,
    isBIEnable:null,
    brandLogoID:null,
    introText:null,
    isCIEnable:null,
    copyRightText:null
  }

  static ecomMainMenuConfigModel = {
    isMMLEnable:null,
    mainMenuLinkList : []
  }


  static dutyFormulaDetail = null;

}

export interface ValidatingObjectFormat {
  [key: string]: {
    [key: string]:
    | any
    | {
      [key: string]: any;
    };
  };
}