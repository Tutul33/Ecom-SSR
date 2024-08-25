import { Config } from "./config";
export class FixedIDs {
  static documentTypeList = [
    { code: 'INC', name: 'Increment' },
    { code: 'PRM', name: 'Promotion' },
    { code: 'LABFST', name: 'Long Absent 1st' },
    { code: 'LABSND', name: 'Long Absent 2nd' },
    { code: 'LABLST', name: 'Long Absent last' },
    { code: 'APPL', name: 'Applications' },
    { code: 'FM', name: 'Forms' },
    { code: 'CRT', name: 'Certificates' }
  ];
  static letterLanguageList = [
    { code: 'ENG', name: 'English' },
    { code: 'BNG', name: 'Bangla' }
  ];
  static machineSetupTypeList = [
    { code: 'MST', name: 'Machine Setup Time' },
    { code: 'SCT', name: 'Size Changing Time' },
    { code: 'PST', name: 'Plate Setup Time' },
    { code: 'CWT', name: 'Cylinder Wash Time' }
  ];
  static service = {

  };

  static reportName = {
    Invoice: 1,
    KOT: 2,
    Token: 3
  };

  static searchType = {
    Like: 1
  }

  static reportLayout = {
    Standard: 1,
    OrderOnTop: 2,
    OrderAndRefMerged: 3,
    ItemDescMerged: 4,
    StandardWithCompanyName: 5,
    StandardWithDistributedCharges: 6,
    StandardWithDetailCharge: 7,
    StandardWithCumulativeCharge: 8,
    SummaryWithDetailCharge: 9,
    SummaryWithMergeCharge: 10,
    SummaryWithCumulativeCharge: 11,
    StandardTwoDigitFloatingPointInAmt: 12,
    PackingSummary: 13,
    PackingDetail: 14,
    WeightMeasurementSummary: 15,
    WeightMeasurementDetail: 16,
    DeliveryChallanTruckReceiptSummary: 17,
    DeliveryChallanTruckReceiptDetail: 18,
    BeneficiaryCertificate: 19,
    CertificateOfOrigin: 20,
    BillOfExchangeOriginal: 21,
    BillOfExchangeDuplicate: 22,
    ChallanAcknowledgement: 23,
    PIWiseChallanStatement: 24,
    SalesContract: 25,
    ChallanInvoice: 26,
    LCCopy: 27,
    CommercialInvoice: 28,
    Summary: 29,
    Detail: 30

  }

  static discountType = {
    'CustomerWise': { code: 1, description: 'Customer Wise' },
    'CustomerBuyerWise': { code: 2, description: 'Customer & BuyerWise' },
    'BICWise': { code: 3, description: 'BIC Wise' }

  };

  static attrCode = {
    'BKM': 'BKM',
    'CNT': 'CNT',
    'COM': 'COM',
    'CRT': 'CRT',
    'CUT': 'CUT',
    'DGN': 'DGN',
    'DIA': 'DIA',
    'DNR': 'DNR',
    'DUM': 'DUM',
    'EGF': 'EGF',
    'FLD': 'FLD',
    'FRM': 'FRM',
    'GCC': 'GCC',
    'GCLR': 'GCLR',
    'GRN': 'GRN',
    'GSM': 'GSM',
    'LAF': 'LAF',
    'LEN': 'LEN',
    'PLT': 'PLT',
    'QLY': 'QLY',
    'SLT': 'SLT',
    'SPE': 'SPE',
    'TCC': 'TCC',
    'TCLR': 'TCLR',
    'TCN': 'TCN',
    'TRM': 'TRM',
    'WAF': 'WAF',
    'WDH': 'WDH',
    'SIZE': 'SIZE',
    'WT': 'WT',
    'SPD': 'SPD',
    'DIM': 'DIM',
    'GSP': 'GSP',
    'PWR': 'PWR',
    'AG': 'AG',
    'CLR': 'CLR',
    'NOH': 'NOH',
    'SPDUM': 'SPDUM',
    'LENMIN': 'LENMIN',
    'LENMAX': 'LENMAX',
    'WDHMIN': 'WDHMIN',
    'WDHMAX': 'WDHMAX',
    'TEMPMIN': 'TEMPMIN',
    'TEMPMAX': 'TEMPMAX',
    'MFY': 'MFY',
    'CC': 'CC',
    'EngTyp': 'EngTyp',
    'FulTyp': 'FulTyp',
    'FulCpty': 'FulCpty',
    'SeatCpty': 'SeatCpty',
    'CrWght': 'CrWght',
    'LdCpty': 'LdCpty',
    'LdWghtKg': 'LdWghtKg',
  };


  static teamType = {

    marketingTeam: 1,
    marketingCSTeam: 2,
    buyerReasponsibleTeam: 3
  }




  static apprField = {
    'ProcessOrganization': 'ORG',
    'Organization': 'ORG',
    'Zone': 'ZN',
    'Area': 'ARA'
  }
  static approvalProcess = {
    'DIST': 'DIST',
    'ISSU': 'ISSU',
    'PCKE': 'PCKE',
    'PLE': 'PLE',
    'PRD': 'PRD',
    'MFILE': 'MFILE'
  }

  static mktVisitType = {
    Bank: 'BNK',
    Buyer: 'BUY',
    Customer: 'CUST',
    Supplier: 'SUPP'
  }

  static communicationWay = {
    'Phone': 1,
    'EMail': 2,
    'Physically': 3,
    'Post': 4,
  };

  static itemExtraCriteria = {
    'Care': 1,
    'Size': 2,
    'MainWithSize': 3,
    'CareWithSize': 4,
    //'HeatTransfer': 5
  };


  // static orderStatus = {
  //   'OrderPlaced': '1',
  //   'OrderUnderProcess': '2',
  //   'OrderReady': '3',
  //   'OrderPickedUp': '4',
  //   'OrderOnTheWay': '5',
  //   'OrderDelivered': '6',
  //   'OrderCancelled': '7'
  // }

  // static activityStatus = {
  //   'Active': 1,
  //   'In-Active': 2,
  //   'Hold': 3,
  // }

  // static paymentStatus = {
  //   'NotDefined': null,
  //   'Due': 0,
  //   'Paid': 1,
  //   'Due(COD)': 2,
  // }


  static orderStatus = {
    'Start': '99',
    'Placed': '1',
    'Confirmed': '2',
    'Prepared': '3',
    'Dispatched': '4',
    'Delivered': '5',
    'Served': '6',
    'Settled': '7'
  }

  static activityStatus = {
    'Active': 1,
    'In-Active': 2,
    'Hold': 3,
  }

  static paymentStatus = {
    'NotDefined': 99,
    'Due': 0,
    'Paid': 1,
    'Due(COD)': 2
  }

  static business = {
    ECommerce: 1,
    POS: 2,
    Table: 3,
    MobileApp: 4
  };



  static responsible = {
    'DLV': 'DLV',
    'STK': 'STK',

  };

  static dateStatus = {
    'Current': 'Current',
    'Upcoming': 'Upcoming',
    'Previous': 'Previous'
  }

  static keyCode = {
    'BIC': 'BIC',
    'NIC': 'NIC',
    'FA': 'FA',
    'FG': 'FG',
    'IC': 'IC',
    'MAC': 'MAC',
    'SIZE': 'SIZE',
    'ACC': 'ACC',
    'RM': 'RM',
    'TP': 'TP',
    'PKI': 'PKI',
    'SFG': 'SFG',
    'CUT': 'CUT',
    'FLD': 'FLD',
    'SLT': 'SLT',
    'PI': 'PI',
    'BILL': 'BILL',
    'BPI': 'BPI',
    'CI': 'CI',
    'SC': 'SC',
    'PPPRC': 'PPPRC',
    'PPRC': 'PPRC',
    'AORD': 'AORD',
    'BORD': 'BORD',
    'SORD': 'SORD',
    'MKT': 'MKT',
    'CSR': 'CSR',
    'ST': 'ST',
    'MCS': 'MCS',
    'IPD': 'IPD',
    'ASN': 'ASN',
    'CHALLAN': 'CHALLAN',
    'DISPATCH': 'DISPATCH',
    'FC': 'FC',
    'SD': 'SD',
    'CD': 'CD',
    'STD': 'STD',
    'DVR': 'DVR',
    'VHCHLP': 'VHCHLP',
    'DLVMAN': 'DLVMAN',
    'VEHI': 'VEHI',
    'THP': 'THP',
    'FRTCHRG': 'FRTCHRG',
    'COM': 'COM',
    'DESP': 'DESP',
    'PRTLSHIPT': 'PRTLSHIPT',
    'MATUDT': 'MATUDT',
    'WVT': 'WVT',
    'SCM': 'SCM',
    'WL': 'WL',
    'DZ': 'DZ',
    'PC': 'PC',
    'LM': 'LM',
    'AC': 'AC',
    'SP': 'SP',
    'CS': 'CS',
    'LI': 'LI',
    'QM': 'QM',
    'PNP': 'P&P',//Paper Printing & Packaging
    'QNC': 'QNC',//Paper Printing & Packaging

  };

  static commercialAdjustment = {
    'ADJ': 'Adjustment',
    'DISC': 'Discount',
    'COMI': 'Commission',
    'RCVPNLTY': 'Receivable Penalty',
    'PAYPNLTY': 'Payable Penalty'
  }


  static organizationElement = {
    'Head Quarter': 1,
    'Country': 2,
    'Franchise': 3,
    'Zone': 4,
    'Administrative Office': 5,
    'Store': 6,
  };

  //static itemCategory = {
  //    ACC: "ACC",
  //    RM: "RM",
  //}
  static buyerType = {
    buyer: 1,
    subBuyer: 2,
    buyingHouse: 3,
    customer: 4, //will load only parent customer
    sister: 5, // will load only sister
    parentCustomer: 6  //will load parent & Child
  };

  static customerTypeCd = {
    Local: 1,
    Foreign: 2,
    EPZ: 3,


  };
  static discountCalMethod = {
    TotalValue: 1,
    BaseUnit: 2,
  };

  static valueType = {
    FixedAmount: 1,
    Percentage: 2,
  };



  static uomType = {
    Standard: 1,
    Packaging: 2,
    Purchase: 3,
  };

  static uomTypeDefination = {
    'S/UOM(Standard unit of measurememt)': 1,
    'P/UOM(Packaging unit of measurement 1)': 2,
    'PrUOM(Purchase unit of measurement)': 3
  };

  static uomTypeList = [
    { code: 1, type: "Standard", defination: "S/UOM(Standard unit of measurememt)" },
    { code: 2, type: "Packaging", defination: "P/UOM(Packaging unit of measurement)" },
    { code: 3, type: "Purchase", defination: "PrUOM(Purchase unit of measurement)" }
  ]

  static addOnType = {
    OrderAddOn: 1,
    ItemAddOn: 2
  }

  static toppingItemCategories = [
    { code: 1, type: "VegItem", defination: "Veg Item" },
    { code: 2, type: "NonVegItem", defination: "Non Veg Item" }
  ]

  static toppingItemCategory = {
    VegItem: 1,
    NonVegItem: 2
  }
  static sizeType = {
    defaultSize: 1,
    avgSize: 2
  };

  static addressType = {
    general: 1,
    billing: 2,
    shipping: 3,
    headOffice: 4
  };
  //static commonElementType = {
  //    itemCategory: 52,
  //    labelCategory: 20
  //};

  static paymentMode = {
    LC: 1,
    TT: 2,
    Cheque: 3,
    Cash: 4,
    FDD: 5,
    DCheque: 6
  };
  //Used to fixed order type in the application, This Data associated with commonelement  table. So before use software we need to entry such ids in common element
  static orderType = {
    'Delivery': 'DLV',
    'Dine-In': 'DI',
    'Takeaway': 'TW',
  };

  static orderCategory = {
    'Ecommerce': 'OO',
    'POS Order': 'PO',
    'Table Order': 'TO',
    'ThirdParty': 'TP',
  };

  static paidBy = {
    Customer: 1,
    Beneficiary: 2
  };

  static processType = {
    Main: 1,
    Sub: 2
  };
  static processGroup = {
    PreProduction: 'PPPRC',
    Production: 'PPRC',
    Finishing: 'FPRC'
  };
  static panelType = {
    Front: 1,
    Back: 2
  };
  static materialGroup = {
    Main: 1,
    Sub: 2
  };
  static materialPosition = {
    Warp: 1,
    Weft: 2
  };

  static transportType =
    {
      air: 100000047,
      road: 100000048
    };


  static employeeStatus = {
    ACT: 'ACT',
    TER: 'TER',
    SUS: 'SUS'

  };
  static employeeTitles = {
    'MR': 'MR',
    'MS': 'MS',
    'MD': 'MD'

  };
  static maritalStatus = {
    SNG: 'SNG',
    MRD: 'MRD',
    DIV: 'DIV',
    WID: 'WID',
    WIDR: 'WIDR'

  };
  static religious = {
    ISL: 'ISL',
    CHR: 'CHR',
    BUD: 'BUD',

  };
  static genders = {
    'Male': 'MAL',
    'Female': 'FEM',
    'Transgender': 'TRAN'
  };

  static bloodGroups = {
    'A+': 'A+',
    'A-': 'A-',
    'B+': 'B+',
    'AB+': 'AB+',
    'AB-': 'AB-',
    'O+': 'O+',
    'O-': 'O-'
  };

  static employeeTypes = {
    REG: 'REG',
    SFT: 'SFT'

  };
  static jobLevelCD = {
    'WJL': 'WJL',
    'S1JL': 'S1JL'
  };

  static jobLevels = {
    'Top Management': '1',
    'Sr. Management': '2',
    'Mid Management': '3',
    'Jr. Management': '4',
    'Staff': '5',
    'Worker': '6',

  };
  static paySchedules = {
    MN: 'MN',
    WK: 'WK',
    DL: 'DL'
  };
  static aggrementTypes = {
    'FT': 'FT',
    'PT': 'PT',
    'CNT': 'CNT',
  };

  static formulaKeys = {
    'BSC': 'BSC',
    'WH': 'WH',
    'BT': 'BT',
    'GS': 'GS'
  }
  static shiftProfileType = {
    'IN': 'IN',
    'OUT': 'OUT',
    'BRk1': 'BRk1',
    'BRK2': 'BRK2',
    'ABM': 'ABM',
    'OTI': 'OTI',
    'OTO': 'OTO',
  }
  static shiftType = {
    'FXD': 'FXD',
    'RND': 'RND',
    'RND2': 'RND2',
    'RND3': 'RND3'
  }

  static workDayType = {
    'FULL': 'FULL',
    'WO': 'WO',
  }


  static piCategory = {

  }

  static remarksType = {
    general: 1,
    special: 2
  };

  static remarksOMPageCode = {
    NIC: 1
  };

  static remarksReasonType = {
    remarks: 1,
    reason: 2
  };


  static pageTitleCode = {
    "Default": 1,
    "Edit": 2,
    "Cancel": 3,
    "Approve": 4
  };

  static objectState = {
    'detached': 0,
    'unchanged': 1,
    'deleted': 2,
    'modified': 3,
    'added': 4,
  };

  static salaryItemType = {
    'EXT': 'EXT',
    'GRS': 'GRS'
  }

  static allowanceType = {
    'FA': 'FA',
    'PBS': 'PBS',
    'PGS': 'PGS'
  }

  static leaveUtilizationType = {
    'F': 'F',
    'P': 'P',
    'H': 'H'
  }

  static leaveType = {
    'AL': 'AL',
    'CL': 'CL',
    'LWP': 'LWP',
    'MTL': 'MTL',
    'PL': 'PL',
    'SL': 'SL',
    'SPL': 'SPL'
  }
  static roundingMethods = {
    'FIX': 'FIX',
    'QTH': 'QTH',
    'HF': 'HF',
    'RTD': 'RTD',
    'RTW': 'RTW',
  }
  static qcStatus = {
    "Waiting": 0,
    "Ok": 16,
    "NotOk": 17,
  }
  static labQcStatus = {
    "Ok": 16,
    "NotOk": 17,
  }


  static approvalStatus = {
    "None": 0,
    "Approved": 1,
    "Rejected": 2,
    "Pending": 3,
    "Denied": 4,
    "Under Review": 5,
    "Recommended": 6,
    "Canceled": 7,
    "NotApproved": 8,
    "Verified": 9,
    "Submitted": 10,
    "Acknowledge": 11,
    "Closed": 12,
    "Passed": 13,
    "NotPassed": 14,
    "Prepared": 15,
    "Ok": 16,
    "NotOk": 17,
    'Draft': 18,
    'StandBy': 19,
    'Received': 20,
    'Done': 44,
    'PartialPassed': 45,
    'Delivered': 67,
    'PartialReceived': 68,
    'NotReceived': 69,

  };


  static shiftPatternType = {
    "Rotating legs": 1,
    "Fixed legs": 2
  };

  static attendanceStatus = {
    "Present": 1,
    "Absent": 2,
    "Leave": 3
  };

  static salaryItem = {
    "BNS": "BNS",
    "FA": "FA",
    "HR": "HR",
    "LN": "LN",
    "MED": "MED",
    "OTHS": "OTHS",
    "PF": "PF",
    "TRNS": "TRNS"
  };

  static report = {
    'PayslipSingle': { code: '1', description: 'Payslip (English)' },
    'PayslipHalf': { code: '2', description: 'Payslip Half (English)' },
    'PayslipBangla': { code: '3', description: 'Payslip (Bangla)' },
    'LeaveBangla': { code: '4', description: 'Leave(Bangla)' },
    'LeaveEnglish': { code: '5', description: 'Leave(English)' },
    'LoanBangla': { code: '6', description: 'Loan(Bangla)' },
    'LoanEnglish': { code: '7', description: 'Loan(English)' }
  };

  static processCode = {
    'LVA': 'LVA',
    'LNA': 'LNA',
    'OTA': 'OTA',
    'SC': 'SC',
    'TRN': 'TRN',
    'TER': 'TER'

  };
  static loanCause = {
    'Family': '1',
    'Personal': '2',
    'Sickness': '3',
    'Others': '4',
  };
  static reportRenderingType = {
    'Excel': 'Excel',
    'PDF': 'PDF',
    'DOC': 'DOC',
    'Image':'Image'
  };

  static reportOrientationType = {
    'Landscape': 1,
    'Portrait': 2,
  };

  static tokenCode = {
    'BT': 'BT',
    'DT': 'DT',
    'LT': 'LT'
  };

  static leavePeriodType = {
    'FirstPeriod': 1,
    'SecondPeriod': 2,
  };

  static IncrementType = {
    'Yearly': 1,
    'Special': 2,
    'Probationary': 3,
    'Gazette': 4,
  };
  static frequencyOccur = {
    'Daily': 1,
    'Weekly': 2,
    'Monthly': 3,
  };
  static itemStructureElement = {
    Head: 1,
    Group: 2,
    Item: 3,
    ItemType: 4,
    ItemCategory: 5,
    ItemSubCategory: 6
  };

  static loanInstallmentStatus =
    {
      Unpaid: 1,
      Paid: 2,
      Cancelled: 3,
      PaidInCash: 4,
    };


  static itemClass = {
    Sale: 1,
    Purchase: 2,
    Stock: 3,
    NonStock: 4,
    Addons: 5,
    RawMaterial: 6,
    Packaging: 7,
    Delivery: 8,
    NonRange: 9,
    Beverage: 10,
    Spicy: 11,
  };

  static priorityCd = {
    Urgent: 59
  };


  //static itemKeyCode = {
  //    fixedAsset: 'FA',
  //    fabricItem: 'FAB',
  //    machineItem: 'MAC',
  //    yarnItem: 'YRN'
  //};

  static codeGenKeyCode = {
    ItemCode: 'IC'
  };

  static attributeInputTypes = {
    Select: 1,
    MultiSelect: 2,
    Entry: 3,
    Datepicker: 4,
    PopUp: 5
  };

  static accessoriesHSCode =
    {
      Code: '5807.90.00'
    };

  //static errorCode = {
  //    duplicateEntry: 1
  //};


  static gatePassType = {
    Delivery: 1,
    Return: 2,
    Returnable: 3,
    Personal: 4,
    DomesticWaste: 5,
    ConstructionWaste: 6,
  };

  static supplierObjectType = {
    Supplier: 1,
    Agent: 2
  };

  static pakageUomTpe = {
    puomOne: 1,
    puomTwo: 2
  };

  static headGroup = {
    All: 0,
    FixedAssets: 1,
    NIC: 2
  };
  static dataTypes = [
    { id: 1, name: "Text" },
    { id: 2, name: "Integer" },
    { id: 3, name: "Numeric" },
    { id: 4, name: "Date" },
    { id: 5, name: "Time" },
    { id: 6, name: "Date & Time" }
  ];

  static submissionMode = {
    'Postal Mail': 1,
    'Physically': 2
  };

  static stockTypes = {
    Inv: 1, // INV > Inventory
    FA: 2, //FA > Fixed Asset
    FIN: 3,
    SEMIFIN: 4
  };
  static termsTypes = {
    PI: 1,
    SC: 2,
    PO: 3,
    BILL: 4,
    LC: 5
  };
  static chargeTypes = {
    pICharge: 'PICRG',
    billCharge: 'BILLCRG',
    sLSCRG: 'SLSCRG',
    tTCRG: 'TTCRG'
  };

  static docStatusText =
    {
      'NPC': "Not Prepared for Customer",
      'PC': "Prepared for Customer",
      'CCR': "Checked for Customer & Rejected",
      'CCA': "Checked for Customer & Approved",
      'SC': "Submitted to Customer",
      'RC': "Rejected by Customer",
      'RCP': "Rejected by Customer & Prepared",
      'AC': "Accepted by Customer",
      'NPB': "Not Prepared for Bank",
      'PB': "Prepared for Bank",
      'CBR': "Checked for Bank & Rejected",
      'CBA': "Checked for Bank & Approved",
      'SB': "Submitted to Bank",
      'RB': "Rejected by Bank",
      'RBP': "Rejected by Bank & Prepared",
      'AB': "Accepted by Bank"
    };

  static docStageStatus =
    {
      'DPFCS': 47,
      'PFCA': 48,
      'PFBS': 49,
      'DocRej': 50,
      'RFpur': 51
    };

  static accptRejctWay = {
    'Postal Mail': 1,
    'Electronic Mail': 2,
    'Physically': 3
  };

  static docChckNote = {
    'Print is not clear': 'PC',
    'Wrong copy attached': 'WCA'
  };

  static payReceiveMode = {
    "Waiting": 0,
    "Purchased": 1,
    "Received": 2,
    "Purchase": 3,
    "Receive": 4,

  };

  static pageType = {
    'DashBoardPage': 3,
    'ReportPage': 4,
    'ViewPage': 5
  };

  static adminRole = {
    'SuperAdministrator': 1,
    'ApplicationAdministator': 2,
    'GroupAdministrator': 3,
  };
  static userTypeCD = {
    'Guest': 1,
    'General': 2,
    'Management': 3,
  };
  static sourchingType = {
    'Purchase': 1,
    'Book': 2,
    'Production': 3,
  };

  static yesNo = {
    'Yes': 'Yes',
    'No': 'No'
  };


  static aggregateFunction = {
    'Sum': 1,
    'Count': 2
  };


  static decimalScale = {
    'ComPriceDecmlScale': 5,
    'ComValueDecmlScale': 4,
    'ComTotalValueDecmlScale': 2,
  };

  static documentForCodes = {
    'Customer': 1,
    'Bank': 2
  };

  static documentGenerationTypeCd = {
    'AutoGenerated': { code: 1, description: 'Auto Generated' },
    'Manual': { code: 2, description: 'Manual' },
    'ThirdParty': { code: 3, description: 'Third Party' },
    'Derived': { code: 4, description: 'Derived' },
  };

  static bizConfigValues =
    {
      'FinalPackWithoutScan': { code: 1, description: 'PUOM1 Scan Option In Final Packing.' },
      'PrintStickerWhileScaning': { code: 2, description: 'Print Sticker While Scaning In Final Packing.' },
    };

  static getList(data) {
    let list = [];
    for (let name in data) {
      list.push({ value: data[name], text: name });
    }
    return list;
  }

  static comDocPrepKeyCode =
    {
      'PackingList': { keyCode: 'PKL', description: 'Packing List - Photo Copy' },
      'TruckRcptClhn': { keyCode: 'TRDC', description: 'Truck Receipt & Delivery Challan' },
      'WtMeasList': { keyCode: 'WM', description: 'Weight & Measurement List' },
      'BeneCertificate': { keyCode: 'BC', description: 'Beneficiary/Inspection Certificate' },
      'CertificateOfOrigin': { keyCode: 'CO', description: 'Certificate Of Origin' },
      'BillOfExchangeOriginal': { keyCode: 'BOEO', description: 'Bill Of Exchange Original' },
      'BillOfExchangeDuplicate': { keyCode: 'BOED', description: 'Bill Of Exchange Duplicate' },
      'PIWiseChallanStatement': { keyCode: 'PICST', description: 'PI Wise Challan Statement' },
      'SalesContract': { keyCode: 'SCRPT', description: 'Sales Contract' },
      'ChallanInvoice': { keyCode: 'CIRPT', description: 'Challan Invoice' },
      'PI': { keyCode: 'PIRPT', description: 'Proforma Invoice (PI)' },
      'LCCopy': { keyCode: 'LCRPT', description: 'LC Copy' },
      'CommercialInvoice': { keyCode: 'COMINV', description: 'Commercial Invoice' }
    };

  static professionalTitles = {
    'Mr.': 'Mr',
    'Mrs.': 'Mrs',
    'Ms.': 'MS',
    'Md.': 'MD',
  };

  static srcCd = {
    'AgainstPR': 1,
    'AgainstPO': 2,
    'DirectRcv': 3,
  };

  // Prepared to add if necessary
  // static menuItems = {
  //   'Pizza': 'pizza',
  //   'Burger': 'burger',
  //   'pasta': 'pasta',
  //   'chicken': 'chicken',
  //   'deals': 'deals',
  //   'RiceBowl': 'rice-bowl',
  //   'steak': 'steak',
  //   'sandwitch': 'sandwitch',
  //   'dessert': 'dessert',
  //   'samusa': 'samusa',
  //   'beverage': 'beverage',
  //   'AddOns': 'add-ons',
  // };

  static pageConfigType = {
    OL: 'OL',
    ORD: 'ORD',
    OSTD: 'OSTD',
    OSC: 'OSC',
    VSC: 'VSC',
    VEC: 'VEC',
    AO: 'AO',
    NO: 'NO',
    CKL: 'CKL',
    ECK: 'ECK',
    EPR: 'EPR',
    MCAMOLAN: 'MCAMOLAN',
    MCSC: 'MCSC',
    MCULCC: 'MCULCC',
    PL: 'PL',
    PN: 'PN',
    PEP: 'PEP',
    BP: 'BP',
    BIN: 'BIN',
    MUHK: 'MUHK',
    SLUI: 'SLUI',
    SLP: 'SLP',
    APLK: 'APLK',
    PRTX: 'PRTX',
    SUTX: 'SUTX',
    SNDEML: 'SNDEML',
    PSRD: 'PSRD',
    PRT: 'PRT',
    HST: 'HST',
    IESL: 'IESL',
    FDN: 'FDN',
    SGNTX: 'SGNTX',
    APKY: 'APKY',
    OMSG: 'OMSG',
    MNDD: 'MNDD',
    MXDD: 'MXDD',
    MNTD: 'MNTD',
    MXTD: 'MXTD',
    DIMNFSD: 'DIMNFSD',
    DIMXFSD: 'DIMXFSD',
    SHWBRCII:'SHWBRCII',
    SHWDLVDTI:'SHWDLVDTI',
    ERP:'ERP',
    EFPC:'EFPC',
    MPR:'MPR',
    TEP:'TEP', 
    TRP:'TRP',
    EMM:'EMM',
    ECWM:'ECWM',
    EAMUS:'EAMUS',
    ECFM:'ECFM',
    EACD:'EACD',
    Ln:'Ln',
    LWOTP:'LWOTP',
    LWPassword:'LWPassword',
    LWFacebook:'LWFacebook',
    LWGmail:'LWGmail',
    GoogleAPKY:'GoogleAPKY',
    FBAPKY:'FBAPKY',
    LinkedInAPKY:'LinkedInAPKY',
    GoogleCID:'GoogleCID',
    FBAPPID:'FBAPPID',
  }

  static oTPType = {
    Mobile: 1,
    Email: 2,
  };

  static branchType = {
    Main: 1,
    Local: 2
  }

  static bannerType = {
    TopBanner: 'TB',
    MiddleBanner01: 'MB01',
    MiddleBanner02: 'MB02',
    MiddleBanner03: 'MB03',
    MiddleBanner04: 'MB04',
    BottomBanner: 'BB'
  }

  static btnBisName = {
    Confirm: { code: 1, description: 'Confirm' },
    PayLater: { code: 2, description: 'Pay Later' },
    Serve: { code: 3, description: 'Serve' },
    Dispatch: { code: 4, description: 'Dispatch' },
    Deliver: { code: 5, description: 'Deliver' },
    Settle: { code: 6, description: 'Settle' },
    Payment: { code: 7, description: 'Payment' },
    Hold: { code: 8, description: 'Hold' },
    Refresh: { code: 9, description: 'Refresh' },
    Void: { code: 10, description: 'Void' },
    VoidList: { code: 11, description: 'Void List' },
    TotalOrderList: { code: 12, description: 'Total Order List' },
    KOTPrint: { code: 13, description: 'KOT Print' },
    TokenPrint: { code: 14, description: 'Token Print' },
    InvoicePrint: { code: 15, description: 'Invoice Print' }
  }

  static postAction = {
    KOT: { code: 1, description: 'KOT Print' },
    TOKN: { code: 2, description: 'Token Print' },
    INV: { code: 3, description: 'Invoice Print' },
    CLR: { code: 4, description: 'Clear' },
  };


  static action = {
    add: 1,
    edit: 2,
    remove: 3
  };

  static paymentType = {
    'POD': { code: 1, description: 'Pay On Delivery' },
    'PN': { code: 2, description: 'Pay Now' },

  };

  static paymentMethod = {
    'CSH': { code: 1, description: 'Cash' },
    'MB': { code: 2, description: 'Mobile Banking' },
    'POS': { code: 3, description: 'POS Credit/Debit Card' },
    'IB': { code: 4, description: 'Internet Banking' },
    'OPG': { code: 5, description: 'Online Payment Gateway' },
  };

  static passwordExpiryPeriod = {
    'Never': { code: "0", description: 'Never' },
    'Every3month': { code: "3", description: 'Every 3 month' },
    'Every6month': { code: "6", description: 'Every 6 month' },
    'Every12month': { code: "12", description: 'Every 12 month' },

  };

  static spicyOption = {
    'Spicy': { code: 1, value: 'Spicy', descr: 'Spicy Item' },
    'MildSpicy': { code: 2, value: 'Mild Spicy', descr: 'Spicy Item' },
    'NonSpicy': { code: 3, value: 'Non Spicy', descr: 'Spicy Item' },
  };

  static memberAddSrc = {
    ECOM: 1,
    POS: 2,
    Table: 3
  }

  static itemStatus = {
    SoldOut: 1,
    NotAvailable: 2,
    Seasonal: 3,
    UpComing: 4,
    TodayNotAvailable: 5
  };

  static ecomPageCd = {
    eComHomePageConfig: 1,
    eComFooterSetup: 2,
    eComMainMenuSetup: 3
  };

  static attributes = {
    VT: 'VT',
    SA: 'SA',
    MNOIWBS: 'MNOIWBS',
    MNODTBC: 'MNODTBC',
    GOIWS: 'GOIWS',
    COIWS: 'COIWS',
    GPL: 'GPL',
    ASL: 'ASL',
    BL: 'BL',
    IT: 'IT',
    CT: 'CT'
  };

  static categoryCd = {
    //eCommerce Home Page Configuration CategoryCd
    TB: 'TB',
    CAT: 'CAT',
    MB01: 'MB01',
    TSD: 'TSD',
    MB02: 'MB02',
    AOS: 'AOS',
    MB03: 'MB03',
    BSI: 'BSI',
    MB04: 'MB04',
    AI: 'AI',
    BB: 'BB',

    //eCommerce Footer Setup CategoryCd
    FQL: 'FQL',
    FSI: 'FSI',
    MAL: 'MAL',
    BI: 'BI',
    CI: 'CI',

    //eCommerce Main Menu Setup CategoryCd
    MML: 'MML'
  };

  static visibilityType = {
    Slide:1,
    Grid:2
  }

  static showAs = {
    ImageAndName:1,
    OnlyImage:2,
    OnlyName:3
  }
  
  // static showAs = [
  //   { id: 1, name: "Image & Name" },
  //   { id: 2, name: "Only Image" },
  //   { id: 3, name: "Only Name" }
  // ];

  static modalPosition = {
    left:'left',
    right:'right',
    top:'top',
    bottom:'bottom'
  }



  static fixedIDs = {
    discountType: FixedIDs.discountType,
    reportName: FixedIDs.reportName,
    reportLayout: FixedIDs.reportLayout,
    gatePassType: FixedIDs.gatePassType,
    remarksType: FixedIDs.remarksType,
    remarksReasonType: FixedIDs.remarksReasonType,
    pageTitleCode: FixedIDs.pageTitleCode,
    objectState: FixedIDs.objectState,
    salaryItemType: FixedIDs.salaryItemType,
    allowanceType: FixedIDs.allowanceType,
    employeeTitles: FixedIDs.employeeTitles,
    maritalStatus: FixedIDs.maritalStatus,
    religious: FixedIDs.religious,
    employeeStatus: FixedIDs.employeeStatus,
    genders: FixedIDs.genders,
    bloodGroups: FixedIDs.bloodGroups,
    uomType: FixedIDs.uomType,
    uomTypeDefination: FixedIDs.uomTypeDefination,
    employeeTypes: FixedIDs.employeeTypes,
    jobLevels: FixedIDs.jobLevels,
    paySchedules: FixedIDs.paySchedules,
    aggrementTypes: FixedIDs.aggrementTypes,
    formulaKeys: FixedIDs.formulaKeys,
    shiftProfileType: FixedIDs.shiftProfileType,
    shiftType: FixedIDs.shiftType,
    workDayType: FixedIDs.workDayType,
    piCategory: FixedIDs.piCategory,
    shiftPatternType: FixedIDs.shiftPatternType,
    leaveUtilizationType: FixedIDs.leaveUtilizationType,
    getList: FixedIDs.getList,
    format: Config.appConstants.formate,
    approvalStatus: FixedIDs.approvalStatus,
    roundingMethods: FixedIDs.roundingMethods,
    attendanceStatus: FixedIDs.attendanceStatus,
    leaveType: FixedIDs.leaveType,
    salaryItem: FixedIDs.salaryItem,
    processCode: FixedIDs.processCode,
    permitAction: Config.appConstants.permitActions,
    report: FixedIDs.report,
    reportRenderingType: FixedIDs.reportRenderingType,
    reportOrientationType: FixedIDs.reportOrientationType,
    leavePeriodType: FixedIDs.leavePeriodType,
    tokenCode: FixedIDs.tokenCode,
    loanCause: FixedIDs.loanCause,
    IncrementType: FixedIDs.IncrementType,
    loanInstallmentStatus: FixedIDs.loanInstallmentStatus,
    qcStatus: FixedIDs.qcStatus,
    labQcStatus: FixedIDs.labQcStatus,
    commercialAdjustment: FixedIDs.commercialAdjustment,
    buyerType: FixedIDs.buyerType,
    sizeType: FixedIDs.sizeType,
    addressType: FixedIDs.addressType,
    orderType: FixedIDs.orderType,
    paymentMode: FixedIDs.paymentMode,
    discountCalMethod: FixedIDs.discountCalMethod,
    processType: FixedIDs.processType,
    processGroup: FixedIDs.processGroup,
    panelType: FixedIDs.panelType,
    materialGroup: FixedIDs.materialGroup,
    materialPosition: FixedIDs.materialPosition,
    transportType: FixedIDs.transportType,
    frequencyOccur: FixedIDs.frequencyOccur,
    accessoriesHSCode: FixedIDs.accessoriesHSCode,
    noDepartmentID: 1,
    itemStructureElement: FixedIDs.itemStructureElement,
    itemClass: FixedIDs.itemClass,
    attributeInputTypes: FixedIDs.attributeInputTypes,
    codeGenKeyCode: FixedIDs.codeGenKeyCode,
    supplierObjectType: FixedIDs.supplierObjectType,
    pakageUomTpe: FixedIDs.pakageUomTpe,
    organizationElement: FixedIDs.organizationElement,
    keyCode: FixedIDs.keyCode,
    headGroup: FixedIDs.headGroup,
    remarksOMPageCode: FixedIDs.remarksOMPageCode,
    responsible: FixedIDs.responsible,
    itemExtraCriteria: FixedIDs.itemExtraCriteria,
    mktVisitType: FixedIDs.mktVisitType,
    attrCode: FixedIDs.attrCode,
    dataTypes: FixedIDs.dataTypes,
    stockTypes: FixedIDs.stockTypes,
    termsTypes: FixedIDs.termsTypes,
    valueType: FixedIDs.valueType,
    chargeTypes: FixedIDs.chargeTypes,
    paidBy: FixedIDs.paidBy,
    apprField: FixedIDs.apprField,
    docStatusText: FixedIDs.docStatusText,
    submissionMode: FixedIDs.submissionMode,
    accptRejctWay: FixedIDs.accptRejctWay,
    docChckNote: FixedIDs.docChckNote,
    payReceiveMode: FixedIDs.payReceiveMode,
    communicationWay: FixedIDs.communicationWay,
    jobLevelCD: FixedIDs.jobLevelCD,
    pageType: FixedIDs.pageType,
    approvalProcess: FixedIDs.approvalProcess,
    customerTypeCd: FixedIDs.customerTypeCd,
    docStageStatus: FixedIDs.docStageStatus,
    adminRole: FixedIDs.adminRole,
    sourchingType: FixedIDs.sourchingType,
    userTypeCD: FixedIDs.userTypeCD,
    yesNo: FixedIDs.yesNo,
    aggregateFunction: FixedIDs.aggregateFunction,
    decimalScale: FixedIDs.decimalScale,
    machineSetupTypeList: FixedIDs.machineSetupTypeList,
    documentTypeList: FixedIDs.documentTypeList,
    letterLanguageList: FixedIDs.letterLanguageList,
    teamType: FixedIDs.teamType,
    bizConfigValues: FixedIDs.bizConfigValues,
    documentForCodes: FixedIDs.documentForCodes,
    documentGenerationTypeCd: FixedIDs.documentGenerationTypeCd,
    searchType: FixedIDs.searchType,
    comDocPrepKeyCode: FixedIDs.comDocPrepKeyCode,
    addOnType: FixedIDs.addOnType,
    dateStatus: FixedIDs.dateStatus,
    professionalTitles: FixedIDs.professionalTitles,
    srcCd: FixedIDs.srcCd,
    orderCategory: FixedIDs.orderCategory,
    pageConfigType: FixedIDs.pageConfigType,
    branchType: FixedIDs.branchType,
    bannerType: FixedIDs.bannerType
  };

  static offer = {
    'BuyNGetSameItemFree': { code: 'BGSIF', description: 'Buy n Get Same Item Free' },
    'CatWiseFixedDisc': { code: 'CWFD', description: 'Category Wise Fixed Discount' },
    'CatWisePercentDisc': { code: 'CWPD', description: 'Category Wise PC(%) Discount' },
    'PercentFlatDiscount': { code: 'FD', description: '% Flat Discount' },
    'ItmWiseFixedAmntDisc': { code: 'IWFAD', description: 'Item Wise Fixed Amount Discount' },
    'ItmWisePercentDisc': { code: 'IWPD', description: 'Item Wise PC(%) Discount' },
  };

  static membershipBenefit = {
    'RegDiscPercent': { code: 1, value:'RGDT', description: 'Regular Discount(%)' },
    'RewardPointEnable': { code: 2, value:'RWPE', description: 'Reward Point Enable' },
  };


}
